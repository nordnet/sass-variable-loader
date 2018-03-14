/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const rm = require('rimraf');

const config = {
  entry: './main.js',
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'variables.js',
    libraryTarget: 'commonjs2',
  },
};

function compile() {
  return new Promise((resolve, reject) => {
    rm(config.output.path, err => {
      if (err) {
        reject(err);
        return;
      }
      webpack(config).run(compileErr => {
        if (compileErr) {
          reject(compileErr);
          return;
        }
        resolve();
      });
    });
  });
}

function testFn() {
  test('variables should be a none-empty object', async () => {
    try {
      await compile();
    } catch (error) {
      throw error;
    }
    // eslint-disable-next-line global-require, import/no-unresolved
    const variables = require('./dist/variables');
    expect(typeof variables).toBe('object');
    expect(Object.keys(variables).length).toBeGreaterThan(20);
  });
}

describe('webpack', testFn);
