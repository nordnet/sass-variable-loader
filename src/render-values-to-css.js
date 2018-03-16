/* eslint-disable max-len */
const { readFileSync } = require('fs');
const path = require('path');
const nodeSass = require('node-sass');
const { last } = require('lodash');
const Handlebars = require('handlebars');
const { generateId } = require('./utils');

const compileTemplate = filename =>
  Handlebars.compile(readFileSync(path.join(__dirname, filename), 'utf8'));

const renderIndented = compileTemplate('variable.sass');
const renderScss = compileTemplate('variable.scss');

function constructEvaluationSass(variableNames, indented) {
  const asClasses = variableNames
    .map(name => {
      const fn = indented ? renderIndented : renderScss;
      return fn({ name });
    })
    .join('\n');

  return asClasses;
}

module.exports = function renderValuesToCSS(
  sass,
  variableNames,
  { cwd, indented },
) {
  const separator = `/* separator-${generateId()} */`;

  const evaluationSass = constructEvaluationSass(variableNames, indented);

  // Set current working directory for @imports
  if (cwd) {
    process.chdir(cwd);
  }

  const constructedSass = [sass, separator, evaluationSass].join('\n');

  const css = nodeSass
    .renderSync({
      data: constructedSass,
      outputStyle: 'compact',
      indentedSyntax: Boolean(indented),
    })
    .css.toString();

  return last(css.split(separator));
};
