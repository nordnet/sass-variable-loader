const { parse } = require('../../src');
const units = require('./units.json');

const tests = {
  withoutComments({ sass }) {
    test('should contain "grayBase"', () => {
      const result = parse(sass);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('grayBase');
      expect(result).toMatchSnapshot();
    });

    const options = { camelCase: false };
    const optionsStr = JSON.stringify(options);
    test(`should contain "gray-base" when options=${optionsStr}`, () => {
      const result = parse(sass, options);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('gray-base');
      expect(result).toMatchSnapshot();
    });
  },

  withComments({ sass }) {
    const result = parse(sass);

    test('should return an object with a key "one"', () => {
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('one');
      expect(result).toMatchSnapshot();
    });

    test('should return an object without a key "y"', () => {
      expect(result).not.toHaveProperty('y');
    });
  },

  indentedSass({ sass }) {
    const result = parse(sass, { indented: true });

    test('should return an object with a key "one"', () => {
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('one');
      expect(result).toMatchSnapshot();
    });
  },

  emptySassFile({ sass }) {
    const result = parse(sass);

    test('should be an empty object', () => {
      expect(result).toEqual({});
    });
  },
};

describe('parseVariables()', () => {
  units.forEach(unit => {
    const testFn = tests[unit.name];
    if (!testFn) {
      return;
    }
    describe(unit.title, () => {
      testFn(unit);
    });
  });
});
