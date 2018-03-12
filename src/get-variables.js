const stripComments = require('strip-json-comments');
const { findAll } = require('./utils');

function getVariables(content) {
  const variableRegex = /\$([^:$]+):/g;

  const matches = findAll(stripComments(content), variableRegex);
  const variables = matches.map(found => found[1].trim());
  return variables;
}

module.exports = getVariables;
