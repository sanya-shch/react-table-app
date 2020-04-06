const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");

const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: "./src/client.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new StatsWriterPlugin({
      stats: {
        all: false,
        assets: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[chunkhash].css"
    })
  ],

  devtool: "inline-source-map"
});
