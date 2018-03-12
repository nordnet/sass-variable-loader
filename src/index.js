const loaderUtils = require('loader-utils');
const parseVariables = require('./parse-variables');

/**
 * Can be used as webpack Loader or directly as a parser
 *
 * @param {string} content
 * @param {object} [passedOptions={}]
 * @returns string|object
 */
function sassVariableLoader(content, passedOptions = {}) {
  let webpackOptions = {};
  const isWebpack = this instanceof Object;
  if (isWebpack) {
    this.cacheable(); // Flag loader as cacheable
    webpackOptions = Object.assign({}, loaderUtils.getOptions(this));
  }
  const options = Object.assign({}, passedOptions, webpackOptions);
  const variables = parseVariables(content, options);

  return isWebpack
    ? `module.exports = ${JSON.stringify(variables)};`
    : variables;
}

module.exports = sassVariableLoader;
