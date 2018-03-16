/* eslint-disable max-len */
const { parse } = require('css');
const { camelCase, get } = require('lodash');
const getVariableNames = require('./get-variable-names');
const renderValuesToCSS = require('./render-values-to-css');

function removeLeadingDot(str) {
  return str.replace(/^\.?/, '');
}

function removeMapTail(str) {
  return str.replace(/\[is-map\]$/, '');
}

function unquote(str) {
  return str.replace(/^"(.*)"$/, '$1');
}

function readMapValue(rule) {
  return rule.declarations.reduce(
    (result, declaration) =>
      Object.assign({}, result, { [declaration.property]: declaration.value }),
    {},
  );
}

function nameFromSelector(selector, camelize) {
  let name = removeLeadingDot(selector);
  name = removeMapTail(name);
  if (camelize) {
    name = camelCase(name);
  }
  return name;
}

function formatMapKey(key, camelize) {
  let formatted = unquote(key);
  if (camelize) {
    formatted = camelCase(formatted);
  }
  return formatted;
}

function readValues(css, camelize) {
  const ast = parse(css);

  const variables = {};

  ast.stylesheet.rules.forEach(rule => {
    const selector = get(rule, 'selectors[0]');
    const name = nameFromSelector(selector, camelize);

    if (selector.endsWith('[is-map]')) {
      const map = variables[name] || {};
      const { key, value } = readMapValue(rule);
      map[formatMapKey(key, camelize)] = unquote(value);
      variables[name] = map;
    } else {
      const value = get(rule, 'declarations[0].value');
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

  const camelize = options.camelCase;
  const variables = readValues(css, camelize);

  return variables;
};
