function findAll(str, regex) {
  const result = [];
  let found = null;

  // eslint-disable-next-line no-cond-assign
  while ((found = regex.exec(str)) !== null) {
    result.push(found);
  }

  return result;
}

function generateId() {
  return Math.random()
    .toString(36)
    .slice(-8);
}

module.exports = {
  findAll,
  generateId,
};
