import sass from 'node-sass';
import camelCase from 'lodash.camelcase';

function constructSassString(variables) {
  const asVariables = variables
    .map(variable => `$${variable.name}: ${variable.value};`)
    .join('\n');
  const asClasses = variables
    .map(variable => `.${variable.name} { value: ${variable.value} }`)
    .join('\n');

  return `${asVariables}\n${asClasses}`;
}

export default function parseVariables(variables, opts = {}) {
  const result = sass.renderSync({
    data: constructSassString(variables),
    outputStyle: 'compact',
  }).css.toString();

  const parsedVariables = result.split(/\n/)
    .filter(line => line && line.length)
    .map(variable => {
      const [, name, value] = /\.(.+) { value: (.+); }/.exec(variable);
      const obj = {};

      if (opts.preserveVariableNames) {
        obj[name] = value;
        return obj;
      }

      obj[camelCase(name)] = value;
      return obj;
    });

  if (!parsedVariables.length) {
    return {};
  }
  return Object.assign.apply(this, parsedVariables);
}
