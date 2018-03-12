const sass = require('node-sass');
const { camelCase, uniqueId, last } = require('lodash');
const getVariables = require('./get-variables');
const { findAll } = require('./utils');

function constructSassString(variables) {
  const asClasses = variables
    .map(variable => `.${variable} { value: $${variable} }`)
    .join('\n');

  return asClasses;
}

function compileToCSS(content, options) {
  const separator = `.${uniqueId('parser-')} { width: 100% }`;

  const variables = getVariables(content);

  const css = sass
    .renderSync({
      data: [content, separator, constructSassString(variables)].join('\n'),
      outputStyle: 'compact',
      indentedSyntax: Boolean(options.indented),
    })
    .css.toString();

  return last(css.split(separator));
}

module.exports = function parseVariables(content, options = {}) {
  const css = compileToCSS(content, options);

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
