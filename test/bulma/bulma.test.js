const { readFileSync } = require('fs');
const pathBuilder = require('path');
const rootDir = require('../../root-dir');
const { parse } = require('../../src');

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
  const cwd = pathBuilder.join(bulmaRoot, 'utilities');
  const sass = getDerivedVariablesSass(
    pathBuilder.join(cwd, 'derived-variables.sass'),
  );
  const options = { indented: true, cwd };

  test('derived-variables should match a snapshot', () => {
    const variables = parse(sass, options);

    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(20);
    expect(variables).toMatchSnapshot();
  });

  test('derived-variables with preserved variables names', () => {
    const variables = parse(
      sass,
      Object.assign({}, options, { camelCase: false }),
    );

    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(20);
    expect(variables).toMatchSnapshot();
  });
});
