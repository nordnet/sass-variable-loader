/* eslint-disable max-len */
const { parse } = require('css');
const { get } = require('lodash');
const getVariableNames = require('./get-variable-names');
const renderValuesToCSS = require('./render-values-to-css');
const { camelizeDeep } = require('./utils');

function removeLeadingDot(str) {
  return str.replace(/^\.?/, '');
}

function removeMapTail(str) {
  return str.replace(/\[is-map\]$/, '');
}

function unquote(str) {
  return str.replace(/^"(.*)"$/, '$1');
}

function nameFromSelector(selector) {
  let name = removeLeadingDot(selector);
  name = removeMapTail(name);
  return name;
}

function readValues(css) {
  const ast = parse(css);

  const variables = {};

  ast.stylesheet.rules.forEach(rule => {
    const selector = get(rule, 'selectors[0]');
    const name = nameFromSelector(selector);
    const value = get(rule, 'declarations[0].value');

    if (selector.endsWith('[is-map]')) {
      const map = variables[name] || {};
      const key = get(rule, 'declarations[0].property');
      map[key] = unquote(value);
      variables[name] = map;
    } else {
      variables[name] = value;
    }
  });

  return variables;
}

module.exports = function parseVariables(sass, passedOptions = {}) {
  const options = Object.assign({ camelCase: true }, passedOptions);

  const variableNames = getVariableNames(sass);

  const css = renderValuesToCSS(sass, variableNames, options);
  if (!css) {
    return {};
  }

  const variables = readValues(css);

  return options.camelCase ? camelizeDeep(variables) : variables;
};
