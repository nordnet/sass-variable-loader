// strip-css-comments only handles multiline comments but sass allows single-line
// style as well. strip-json-comments handles both
const stripComments = require('strip-json-comments');

export default function getVariables(content) {
  const variableRegex = /\$(.+):\s+(.+);/;
  const variables = [];
  stripComments(content).split('\n').forEach(line => {
    const variable = variableRegex.exec(line);
    if (!variable) return;

    const name = variable[1].trim();
    const value = variable[2].replace(/!default|!important/g, '').trim();

    variables.push({ name, value });
    return;
  });

  return variables;
}
