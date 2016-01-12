# Sass variable loader for webpack

> Parses your Sass variables and returns an object containing each variable camelCased and the end value as it would be in CSS.
>
> That means full support for Sass' lighten, darken, mix etc.

**Input:**
``` scss
$gray-base: #000 !default;
$gray-darker: lighten($gray-base, 13.5%) !default; // #222
$gray-dark: lighten($gray-base, 20%) !default; // #333
$gray: lighten($gray-base, 33.5%) !default; // #555
$gray-light: lighten($gray-base, 46.7%) !default; // #777
$gray-lighter: lighten($gray-base, 93.5%) !default; // #eee
```

**Result:**
``` javascript
{
  grayBase: '#000',
  grayDarker: '#222222',
  grayDark: '#333333',
  gray: '#555555',
  grayLight: '#777777',
  grayLighter: '#eeeeee'
}
```

## Installation

`npm install --save-dev sass-variable-loader`

## Usage

``` javascript
import variables from 'sass-variable-loader!./_variables.scss';
// => returns all the variables in _variables.scss as an object with each variable name camelCased
```
**Note:** If you've already defined loaders for Sass files in the configuration, you can override the [loader order](https://webpack.github.io/docs/loaders.html#loader-order) by writing `!!sass-variable-loader!./_variables.scss` to disable all loaders specified in the configuration for that module request.

## Options

You can pass options to the loader via [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters).

### preserveVariableNames

``` javascript
import variables from 'sass-variable-loader?preserveVariableNames!./_variables.scss';
// => returns all the variables in _variables.scss as an object with each variable name left intact
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
