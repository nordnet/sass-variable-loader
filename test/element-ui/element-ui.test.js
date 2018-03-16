const { readFileSync } = require('fs');
const pathBuilder = require('path');
const rootDir = require('../../root-dir');
const parseVariables = require('../../src/parse-variables');

const themeSrcPath = pathBuilder.join(
  rootDir,
  'node_modules',
  'element-ui',
  'packages',
  'theme-chalk',
  'src',
);

describe('element-ui', () => {
  const varScss = readFileSync(
    pathBuilder.join(themeSrcPath, 'common', 'var.scss'),
    'utf8',
  );

  test('var.scss should match snapshot', () => {
    const variables = parseVariables(varScss);
    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(100);
    expect(variables).toMatchSnapshot();
  });

  test('var.scss with camelCase=false should match snapshot', () => {
    const variables = parseVariables(varScss, { camelCase: false });
    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(100);
    expect(variables).toMatchSnapshot();
  });

  test("mixins.scss shouldn't throw", () => {
    const cwd = pathBuilder.join(themeSrcPath, 'mixins');
    const sass = readFileSync(pathBuilder.join(cwd, 'mixins.scss'), 'utf8');
    const variables = parseVariables(sass, { cwd });
    expect(typeof variables).toBe('object');
  });
});
