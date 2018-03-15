const getVariableNames = require('../../src/get-variable-names');
const units = require('./units.json');

function testUnit({ sass, variablesCount }) {
  const variables = getVariableNames(sass);

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
    const variables = getVariableNames('$a: 1; $a: 2;');
    expect(Object.keys(variables)).toHaveLength(1);
  });
}

describe('getVariableNames()', () => {
  units.forEach(describeUnit);
  describe('other checks', checkRemovingDuplicates);
});
