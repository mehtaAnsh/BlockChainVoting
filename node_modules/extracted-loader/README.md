# extracted-loader [![][npm-image]][npm-url] <img align="right" width="200" src="https://i.imgur.com/hBxPotS.png">

[npm-image]: http://img.shields.io/npm/v/extracted-loader.svg?style=flat-square
[npm-url]: http://npmjs.org/package/extracted-loader

It hotreloads extracted stylesheets extracted with `ExtractTextPlugin`.

No configuration needed. A better [css-hot-loader](https://github.com/shepherdwind/css-hot-loader).

## Use case

You want to hot reload only stylesheets, not the whole page. Great for editing dynamic views.

## Installation

```
npm install extracted-loader --save-dev
```

or

```
yarn add extracted-loader --dev 
```

And then you can use it for example as so:

```js
config.module.rules.push({
  test: /\.css$/,
  use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
    /* Your configuration here */
  }))
})

config.plugins.push(new ExtractTextPlugin('index.css'))
```


## Example use with sass

```js
config.module.rules.push({
  test: /\.(sa|sc|c)ss$/,
  use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
    use: [
      "babel-loader",
      {
        loader: 'css-loader',
        options: {
          url: true,
          minimize: !dev,
          sourceMap: dev,
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: dev,
          plugins: [
            require('autoprefixer')({
              /* options */
            })
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: dev
        }
      }
    ]
  }))
})

config.plugins.push(new ExtractTextPlugin('index.css'))
```

## How it works

By reloading all relevant `<link rel="stylesheet">` when extracted text changes.

## How to use with...

- [next.js](https://github.com/sheerun/extracted-loader/tree/master/examples/with-next)

## Contributing

Yes, please

## License

MIT
