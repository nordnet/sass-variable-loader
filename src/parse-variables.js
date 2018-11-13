import sass from 'node-sass';
import camelCase from 'lodash.camelcase';

const mapRegex = /([^(].+?):\s?([0-9A-z-_$#'"\\]+),?\s?/g;

function constructSassString(variables) {
  const asVariables = variables
    .map(variable => `$${variable.name}: ${variable.value};`)
    .join('\n');
  const asClasses = variables
    .map(variable => {
      if (variable.value.startsWith('(')) { // is a map
        let matches = mapRegex.exec(variable.value);
        const map = [];
        while (matches !== null) {
          map.push([matches[1], matches[2]]);
          matches = mapRegex.exec(variable.value);
        }
        const mapVars = map.reduce(
          (acc, mapVar) =>
            `${acc}\n${mapVar[0]}: ${mapVar[1]};`,
          ''
        );
        return `.${variable.name} { ${mapVars} }`;
      }
      return `.${variable.name} { value: ${variable.value} }`;
    })
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
      if ((variable.match(/;/g) || []).length > 1) { // is a map
        const name = /\.(.+) {/.exec(variable)[1];
        const varRegex = /\s([A-z-_]+?): ([0-9A-z-_$#'"\\]+?);/g;
        let matches = varRegex.exec(variable);
        const vars = {};
        while (matches !== null) {
          vars[matches[1]] = matches[2];
          matches = varRegex.exec(variable);
        }
        return { [name]: vars };
      }
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
