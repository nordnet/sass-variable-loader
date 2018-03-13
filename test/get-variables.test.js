/* eslint-disable import/no-extraneous-dependencies, max-len */
const data = require('./data.json');
const getVariables = require('../src/get-variables');

describe('without comments', () => {
  const variables = getVariables(data.sass.withoutComments);

  describe('getVariables()', () => {
    test('should return an array with 6 items', () => {
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(6);
    });
  });
});

describe('with comments', () => {
  const variables = getVariables(data.sass.withComments);

  describe('getVariables()', () => {
    test('should return an array with 2 items', () => {
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(2);
    });
  });
});

describe('indented sass', () => {
  const variables = getVariables(data.sass.indented);

  describe('getVariables()', () => {
    test('should return an array with 2 items', () => {
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(2);
    });
  });
});

describe('empty sass-file', () => {
  describe('getVariables()', () => {
    function testFn() {
      const sass = '';
      return getVariables(sass);
    }

    test('should not throw', () => {
      expect(testFn).not.toThrowError(TypeError);
    });

    test('should be an empty array', () => {
      const variables = testFn();
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(0);
    });
  });
});
