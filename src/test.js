import path from 'path';
// import fs from 'fs';
import util from 'util';
import thematic from 'sass-thematic';
// import { parse } from 'scss-parser';
// import createQueryWrapper from 'query-ast';
// import camelCase from 'lodash.camelcase';

// const file = path.join(__dirname, './test.scss');

// fs.readFile(file, 'utf-8', (err, data) => {
//   if (err) throw err;
//   const ast = createQueryWrapper(parse(data));
//   const result = ast().find('variable').map(node => {
//     const name = ast(node).value();
//     const value = ast(node).children();
//
//     console.log(util.inspect(value, false, null));
//
//     return {
//       [camelCase(name)]: value,
//     };
//   });
//
//   console.log(util.inspect(result, false, null));
// });

thematic.parseAST({
  file: path.join(__dirname, './test.scss'),
}, (err, ast) => {
  ast.traverseByType('variable', variable => {
    console.log(util.inspect(variable, false, null));
  });
});
