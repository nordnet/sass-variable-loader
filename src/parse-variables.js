/* eslint-disable max-len */
const { parse } = require('css');
const { camelCase, get } = require('lodash');
const getVariableNames = require('./get-variable-names');
const renderValuesToCSS = require('./render-values-to-css');

function removeLeadingDot(str) {
  return str.replace(/^\.?/, '');
}

function extractValues(css, camelize) {
  const ast = parse(css);

  const variables = ast.stylesheet.rules.reduce((result, rule) => {
    const name = removeLeadingDot(get(rule, 'selectors[0]'));
    const value = get(rule, 'declarations[0].value');

    // eslint-disable-next-line no-param-reassign
    result[camelize ? camelCase(name) : name] = value;

    return result;
  }, {});

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
  const variables = extractValues(css, camelize);

  return variables;
};
