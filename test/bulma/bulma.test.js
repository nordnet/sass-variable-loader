const { readFileSync } = require('fs');
const pathBuilder = require('path');
const rootDir = require('../../root-dir');
const parseVariables = require('../../src/parse-variables');

const bulmaRoot = pathBuilder.join(rootDir, 'node_modules', 'bulma', 'sass');

function getDerivedVariablesSass(file) {
  const content = readFileSync(file, 'utf8');
  return [
    '@import "initial-variables.sass"',
    '@import "functions.sass"',
    '',
    content,
  ].join('\n');
}

describe('bulma', () => {
  test('derived-variables.sass should match a snapshot', () => {
    const cwd = pathBuilder.join(bulmaRoot, 'utilities');
    const sass = getDerivedVariablesSass(
      pathBuilder.join(cwd, 'derived-variables.sass'),
    );
    const variables = parseVariables(sass, { indented: true, cwd });

    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(20);
    expect(variables).toMatchSnapshot();
  });
});
