/* eslint-disable import/no-extraneous-dependencies, max-len */
const { expect } = require('chai');
const data = require('./data.json');
const getVariables = require('../src/get-variables');

context('without comments', () => {
  const variables = getVariables(data.sass.withoutComments);

  describe('getVariables()', () => {
    it('should return an array with 6 items', () => {
      expect(variables).to.be.a('array');
      expect(variables).to.have.length(6);
    });
  });
});

context('with comments', () => {
  const variables = getVariables(data.sass.withComments);

  describe('getVariables()', () => {
    it('should return an array with 2 items', () => {
      expect(variables).to.be.a('array');
      expect(variables).to.have.length(2);
    });
  });
});

context('indented sass', () => {
  const variables = getVariables(data.sass.indented);

  describe('getVariables()', () => {
    it('should return an array with 2 items', () => {
      expect(variables).to.be.a('array');
      expect(variables).to.have.length(2);
    });
  });
});

context('empty sass-file', () => {
  describe('getVariables()', () => {
    function testFn() {
      const sass = '';
      return getVariables(sass);
    }

    it('should not throw', () => {
      expect(testFn).to.not.throw(TypeError);
    });

    it('should be an empty array', () => {
      const variables = testFn();
      expect(variables).to.be.an('array');
      expect(variables).to.have.length(0);
    });
  });
});
