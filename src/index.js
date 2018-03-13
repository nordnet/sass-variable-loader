const loaderUtils = require('loader-utils');
const parseVariables = require('./parse-variables');

/**
 * Can be used as webpack Loader or directly as a parser
 *
 * @param {string} content
 * @param {object} [passedOptions={}]
 * @returns string|object
 */
function sassVariableLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const options = Object.assign({}, loaderUtils.getOptions(this));
  const variables = parseVariables(content, options);

  return `module.exports = ${JSON.stringify(variables)};`;
}

module.exports = sassVariableLoader;
