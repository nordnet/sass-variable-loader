const stripComments = require('strip-json-comments');
const { uniq } = require('lodash');
const { findAll } = require('./utils');

function getVariables(content) {
  const variableRegex = /\$([^:$})\s]+):([\s(]*)/g;

  const excludeMaps = match => {
    const afterColon = match[2] || '';
    return !afterColon.includes('(');
  };

  const matches = findAll(stripComments(content), variableRegex);
  const variables = matches.filter(excludeMaps).map(found => found[1].trim());
  return uniq(variables);
}

module.exports = getVariables;
