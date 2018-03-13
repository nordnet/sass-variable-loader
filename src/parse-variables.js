const nodeSass = require('node-sass');
const { camelCase, last } = require('lodash');
const getVariables = require('./get-variables');
const { findAll, generateId } = require('./utils');

function constructSassString(variables) {
  const asClasses = variables
    .map(variable => `.${variable} { value: $${variable} }`)
    .join('\n');

  return asClasses;
}

function compileToCSS(content, options) {
  const separator = `.separator-${generateId()} { width: 100% }`;

  const variables = getVariables(content);
  if (variables.length === 0) {
    return '';
  }

  const constructedSass = constructSassString(variables);

  const css = nodeSass
    .renderSync({
      data: [content, separator, constructedSass].join('\n'),
      outputStyle: 'compact',
      indentedSyntax: Boolean(options.indented),
    })
    .css.toString();

  return last(css.split(separator));
}

module.exports = function parseVariables(content, options = {}) {
  const css = compileToCSS(content, options);
  if (!css) {
    return {};
  }

  const regex = /\.(.+){\s*value:([^;]+);/g;
  const matches = findAll(css, regex);
  const variables = matches.reduce((acc, found) => {
    const name = found[1].trim();
    const value = found[2].trim();
    const key = options.preserveVariableNames ? name : camelCase(name);
    // eslint-disable-next-line no-param-reassign
    acc[key] = value;
    return acc;
  }, {});

  return variables;
};
