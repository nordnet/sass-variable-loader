const getVariables = require('../../src/get-variables');
const units = require('./units.json');

function testUnit({ sass, variablesCount }) {
  const variables = getVariables(sass);

  test(`should return an array with ${variablesCount} items`, () => {
    expect(Array.isArray(variables)).toBe(true);
    expect(variables).toHaveLength(variablesCount);
  });
}

function describeUnit(unit) {
  describe(unit.title, () => testUnit(unit));
}

function checkRemovingDuplicates() {
  test('should remove duplicate names', () => {
    const variables = getVariables('$a: 1; $a: 2;');
    expect(Object.keys(variables)).toHaveLength(1);
  });
}

describe('getVariables()', () => {
  units.forEach(describeUnit);
  describe('other checks', checkRemovingDuplicates);
});
