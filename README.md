# Sass variable parser and loader for webpack

> Works as a **Webpack loader** or can be used as **parser** in Node.js

Parses **variables** from **sass**, evaluates their values with [node-sass](https://github.com/sass/node-sass) and returns the result as a Javascript **object**.

### Features

* Returns only **top-level** variables (obviously).
* Only "**plain**" variables; discards _maps_. Sorry about that.
* By default "**camelizes**" variable names. Can be changed through [options](#options).
* Returns only variables from the imported file, but follows `@import`s to evaluate dependent values.
* Supports both **scss** and **indented** syntax.
* **Reliable**. Thoroughly tested.

### Result example

```javascript
{
  tagColor: "#409EFF",
  tagBorder: "rgba(64, 158, 255, 0.2)",
  tagBorderRadius: "4px"
}
```

## Installation

`npm i sass-variable-parser -D`

## Usage as a Webpack loader

```javascript
import variables from '!!sass-variable-parser!./_variables.scss';
// => returns all the variables in _variables.scss as an object with each variable name camelCased
```

Without camel-casing:

```javascript
import variables from '!!sass-variable-parser?-camelCase!./_variables.scss';
```

## Usage as a parser

```javascript
const path = require('path');
const { parse } = require('sass-variable-parser');

const options = {
  // defaults to true
  camelCase: false,
  // optional, only if there are @imports with relative paths
  cwd: path.resolve(__dirname, 'node_modules/bulma/sass/utilities'),
  // true means indented sass syntax, defaults to false ('scss' syntax)
  indented: true,
};

const variables = parse(
  `
@import "initial-variables.sass"

$primary: $turquoise !default
$info: $cyan !default

$family-primary: $family-monospace`,
  options,
);
```

`variables` would be:

```javascript
{
  "primary": "#00d1b2",
  "info": "#209cee",
  "family-primary": "monospace"
}
```

Check out `test` folder for more exmaples

## Options

When using as a loader pass through query string ([see how](https://github.com/webpack/loader-utils#parsequery)).

When using as a parser pass options object as the second parameter to `parse` method.

| Option    | Default                               | Description                                                                                                      |
| --------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| camelCase | true                                  | Whether to camelize variable names                                                                               |
| cwd       | Webpack's context when used as loader | Current working directory from which @import paths are calculated. Typically not needed when used as loader      |
| indented  | false                                 | Whether the loaded sass is in indented syntax or not. When used as loader is auto-calculated from file extension |

## Why fork

It's a complete rewrite of the original `sass-variable-loader`. That had many bugs and seemed not to be actively maintained. But thanks for the directions anyway!

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
