import loaderUtils from 'loader-utils';
import thematic from 'sass-thematic';

module.exports = function sassVariableLoader() {
  const callback = this.async();
  const { resourcePath } = loaderUtils.parseQuery(this.query);

  thematic.parseAST({
    file: resourcePath,
  }, (err, ast) => {
    console.log(ast);
    if (err) return callback(err);
    callback(null, ast);
    return ast;
  });
};
