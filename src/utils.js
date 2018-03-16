const { camelCase, mapKeys, forEach } = require('lodash');

// Finds all mathes of regex in a string
function findAll(str, regex) {
  const result = [];
  let found = null;

  // eslint-disable-next-line no-cond-assign
  while ((found = regex.exec(str)) !== null) {
    result.push(found);
  }

  return result;
}

// Generates 8-symbols long id
function generateId() {
  return Math.random()
    .toString(36)
    .slice(-8);
}

// Returns a promise resolving after passed time
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

function camelizeDeep(object) {
  const newObj = mapKeys(object, (value, key) => camelCase(key));
  forEach(newObj, (value, key) => {
    if (typeof value === 'object') {
      newObj[key] = camelizeDeep(value);
    }
  });
  return newObj;
}

module.exports = {
  findAll,
  generateId,
  delay,
  camelizeDeep,
};
