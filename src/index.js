const loaderUtils = require('loader-utils');
const parseVariables = require('./parse-variables');

function sassVariableLoader(content) {
  this.cacheable(); // Flag loader as cacheable

  const options = {
    preserveVariableNames: false,
    cwd: this.context,
    indented: this.resourcePath.endsWith('.sass'),
  };
  Object.assign(options, loaderUtils.getOptions(this));

  const variables = parseVariables(content, options);

  return `module.exports = ${JSON.stringify(variables, null, 2)};`;
}

module.exports = sassVariableLoader;
