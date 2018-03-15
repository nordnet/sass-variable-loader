/* eslint-disable max-len */
const nodeSass = require('node-sass');
const { last } = require('lodash');
const { generateId } = require('./utils');

function renderVariableIndented(name) {
  return [
    `@if variable-exists('${name}') and type-of($${name}) != map`,
    `  .${name}`,
    `    value: $${name}`,
  ].join('\n');
}

function renderVariableScss(name) {
  return `@if variable-exists('${name}')
            and type-of($${name}) != map {
              .${name} { value: $${name} };
          }`;
}

function constructEvaluationSass(variableNames, indented) {
  const asClasses = variableNames
    .map(variable => {
      const fn = indented ? renderVariableIndented : renderVariableScss;
      return fn(variable);
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
