/* eslint-disable import/no-extraneous-dependencies, max-len */
const data = require('./data.json');
const parseVariables = require('../src/parse-variables');

describe('without comments', () => {
  const sass = data.sass.withoutComments;

  describe('parseVariables()', () => {
    test('should return an object with the key grayBase', () => {
      const result = parseVariables(sass);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('grayBase');
    });
  });

  describe('parseVariables({ preserveVariableNames: true })', () => {
    test('should return an object with the key gray-base', () => {
      const result = parseVariables(sass, { preserveVariableNames: true });
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('gray-base');
    });
  });
});

describe('with comments', () => {
  const sass = data.sass.withComments;

  describe('parseVariables()', () => {
    test('should return an object with the key one', () => {
      const result = parseVariables(sass);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('one');
    });
    test('should not return an object with the key y', () => {
      const result = parseVariables(sass);
      expect(typeof result).toBe('object');
      expect(result).not.toHaveProperty('y');
    });
  });
});

describe('indented sass', () => {
  const sass = data.sass.indented;

  describe('parseVariables()', () => {
    test('should return an object with the key one', () => {
      const result = parseVariables(sass, { indented: true });
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('one');
    });
  });
});

describe('empty sass-file', () => {
  describe('parseVariables()', () => {
    function testFn() {
      const sass = '';
      return parseVariables(sass);
    }

    test('should not throw', () => {
      expect(testFn).not.toThrowError(TypeError);
    });

    test('should be an empty object', () => {
      const variables = testFn();
      expect(typeof variables).toBe('object');
      expect(Object.keys(variables)).toHaveLength(0);
    });
  });
});
