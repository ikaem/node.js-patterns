// Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const isProduction = process.env.NODE_ENV == 'production';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { webpack } from 'webpack';
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
      filename: 'main.[hash].js',
    },
    devServer: {
      open: true,
      host: 'localhost',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),

      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
      rules: [
        //   tghis is default
        {
          test: /\.(js|jsx)$/i,
          //   THIS IS default
          //   loader: 'babel-loader',
          //   TODO stopped here
          //   https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/10-universal-javascript/07-frontend-only-app/webpack.config.cjs
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
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
