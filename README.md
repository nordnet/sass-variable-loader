# Sass variable loader for webpack

## Installation

`npm install sass-variable-loader`

## Usage

``` javascript
var variables = require("sass-variable-loader!./variables.scss");
// => returns variables.scss content as an object with each variable name camelCased
```

## Options

You can pass options to the loader via [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters).

### preserveVariableNames

``` javascript
var variables = require("sass-variable-loader?preserveVariableNames!./variables.scss");
// => returns variables.scss content as an object with each variable name left intact
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
