// Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const isProduction = process.env.NODE_ENV == 'production';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackRootPlugin from 'html-webpack-root-plugin';
console.log('html', new HtmlWebpackRootPlugin());
// import { webpack } from 'webpack';
import { argv } from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = () => {
  // TODO we are getting mode here instead of by checking node env
  const isProd = argv.mode === 'production';

  return {
    entry: './src/frontend/index.js',
    output: {
      // so all built stuff will go to public folder
      path: resolve(__dirname, 'public'),
      //   not entirely sure what this is
      // base path for all assets inside an app
      publicPath: '/',
      //   filename: 'main.js',
      // TODO this is mine. testing with has
      // filename: 'main.[hash].js',
      // cannot have hash bc serverside uses it, and we dont use serverside with webpack
      filename: 'main.js',
    },
    // TODO these are defaults, I like this
    // devServer: {
    //   open: true,
    //   host: 'localhost',
    // },
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: 'index.html',
    // TODO i could use this instead, and set root there?
    //   }),

    //   // Add your plugins here
    //   // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    // ],
    module: {
      rules: [
        //   tghis is default
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          // use: {
          // loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react'],
          //   plugins: ['@babel/plugin-transform-runtime'],
          // },
          // },
          //   THIS IS default
          //   loader: 'babel-loader',
          //   TODO stopped here
          //   https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/10-universal-javascript/07-frontend-only-app/webpack.config.cjs
        },
        // THIS IS FOR ASSETS
        // {
        //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        //   type: 'asset',
        // },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    // TODO what is eval
    // this is build time effecting also
    devtool: isProd ? 'source-maps' : 'eval',
    devServer: {
      historyApiFallback: true,
      open: true,
    },
    // TODO this is now optimized by default iwth default config, I think
    // optimization: isProd
    //   ? {
    //       minimize: true,
    //       minimizer: [new TerserPlugin()],
    //     }
    //   : {},
    plugins: isProd
      ? []
      : [
          new HtmlWebpackPlugin({
            title: 'My library',
            templateContent: `<html>
            <body>
              <div id="root"></div>
            </body>
          </html>`,
          }),
          // TODO lets try without this for now
          // new HtmlWebpackRootPlugin(),
        ],
  };
};

// this is also cool, how they just add stuff here into the object
// module.exports = () => {
//   if (isProduction) {
//     config.mode = 'production';
//   } else {
//     config.mode = 'development';
//   }
//   return config;
// };

export default config;
