const loaderUtils = require('loader-utils');
const parseVariables = require('./parse-variables');

function sassVariableLoader(content) {
  this.cacheable(); // Flag loader as cacheable

  const options = {
    camelCase: true,
    cwd: this.context,
    indented: this.resourcePath.endsWith('.sass'),
  };
  Object.assign(options, loaderUtils.getOptions(this));

  const variables = parseVariables(content, options);

  return `module.exports = ${JSON.stringify(variables, null, 2)};`;
}

sassVariableLoader.parse = (sass, options) => parseVariables(sass, options);

module.exports = sassVariableLoader;
