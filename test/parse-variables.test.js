/* eslint-disable import/no-extraneous-dependencies, max-len */
const { expect } = require('chai');
const data = require('./data.json');
const parseVariables = require('../src/parse-variables');

context('without comments', () => {
  const sass = data.sass.withoutComments;

  describe('parseVariables()', () => {
    it('should return an object with the key grayBase', () => {
      const result = parseVariables(sass);
      expect(result).to.be.a('object');
      expect(result).to.include.keys('grayBase');
    });
  });

  describe('parseVariables({ preserveVariableNames: true })', () => {
    it('should return an object with the key gray-base', () => {
      const result = parseVariables(sass, { preserveVariableNames: true });
      expect(result).to.be.a('object');
      expect(result).to.include.keys('gray-base');
    });
  });
});

context('with comments', () => {
  const sass = data.sass.withComments;

  describe('parseVariables()', () => {
    it('should return an object with the key one', () => {
      const result = parseVariables(sass);
      expect(result).to.be.a('object');
      expect(result).to.include.keys('one');
    });
    it('should not return an object with the key y', () => {
      const result = parseVariables(sass);
      expect(result).to.be.a('object');
      expect(result).to.not.include.keys('y');
    });
  });
});

context('indented sass', () => {
  const sass = data.sass.indented;

  describe('parseVariables()', () => {
    it('should return an object with the key one', () => {
      const result = parseVariables(sass, { indented: true });
      expect(result).to.be.a('object');
      expect(result).to.include.keys('one');
    });
  });
});

context('empty sass-file', () => {
  describe('getVariables()', () => {
    function testFn() {
      const sass = '';
      return parseVariables(sass);
    }

    it('should not throw', () => {
      expect(testFn).to.not.throw(TypeError);
    });

    it('should be an empty object', () => {
      const variables = testFn();
      expect(variables).to.be.an('object');
      expect(Object.keys(variables)).to.have.length(0);
    });
  });
});
