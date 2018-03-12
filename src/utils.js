function findAll(str, regex) {
  const result = [];
  let found = null;

  // eslint-disable-next-line no-cond-assign
  while ((found = regex.exec(str)) !== null) {
    result.push(found);
  }

  return result;
}

module.exports = { findAll };
