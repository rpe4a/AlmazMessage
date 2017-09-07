const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "message_styles.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    message: ["babel-polyfill", "./src/js/index.js"],
    vendor: ["jquery"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "cheap-eval-source-map",

  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader?url=false"
            },
            {
              loader: "group-css-media-queries-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    require("autoprefixer")({
                      browsers: ["last 2 versions"],
                      cascade: false
                    })
                  ];
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};
