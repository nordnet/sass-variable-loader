const loaderUtils = require('loader-utils');
const getVariables = require('./get-variables');
const parseVariables = require('./parse-variables');

module.exports = function sassVariableLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const opts = Object.assign({}, loaderUtils.getOptions(this));
  const variables = parseVariables(getVariables(content), opts);

  return `module.exports = ${JSON.stringify(variables)};`;
};
