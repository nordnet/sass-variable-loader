const stripComments = require('strip-json-comments');
const { uniq } = require('lodash');
const { findAll } = require('./utils');

function getVariableNames(content) {
  const variableRegex = /\$([^:$})\s]+):/g;

  const matches = findAll(stripComments(content), variableRegex);
  const variables = matches.map(found => found[1].trim());
  return uniq(variables);
}

module.exports = getVariableNames;
