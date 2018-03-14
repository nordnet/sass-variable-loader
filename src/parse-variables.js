/* eslint-disable max-len */
const nodeSass = require('node-sass');
const { camelCase, last } = require('lodash');
const getVariables = require('./get-variables');
const { findAll, generateId } = require('./utils');

function constructEvaluationSass(variables, options) {
  const asClasses = variables
    .map(variable => {
      if (options.indented) {
        return [
          `@if variable-exists('${variable}') and type-of($${variable}) != map`,
          `  .${variable}`,
          `    value: $${variable}`,
        ].join('\n');
      }
      return `
          @if variable-exists('${variable}')
            and type-of($${variable}) != map {
              .${variable} { value: $${variable} };
          }`;
    })
    .join('\n');

  return asClasses;
}

function compileToCSS(content, options) {
  const separator = options.indented
    ? [`.separator-${generateId()}`, '  width: 100%'].join('\n')
    : `.separator-${generateId()} { width: 100% }`;

  const variables = getVariables(content);

  const evaluationSass = constructEvaluationSass(variables, options);

  if (options.cwd) {
    process.chdir(options.cwd);
  }
  const css = nodeSass
    .renderSync({
      data: [content, separator, evaluationSass].join('\n'),
      outputStyle: 'compact',
      indentedSyntax: Boolean(options.indented),
    })
    .css.toString();

  return last(css.split(separator));
}

module.exports = function parseVariables(content, passedOptions = {}) {
  const options = Object.assign({ camelCase: true }, passedOptions);

  const css = compileToCSS(content, options);
  if (!css) {
    return {};
  }

  const regex = /\.([^\s]+)[\s{]+value:([^;}]+).*$/gm;
  const matches = findAll(css, regex);
  const variables = matches.reduce((acc, found) => {
    const name = found[1].trim();
    const value = found[2].trim();
    const key = options.camelCase ? camelCase(name) : name;
    // eslint-disable-next-line no-param-reassign
    acc[key] = value;
    return acc;
  }, {});

  return variables;
};
