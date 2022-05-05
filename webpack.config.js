const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: "index.html",
    inject: true,
    template: path.resolve(__dirname, "src", "index.html"),
  }),
];

module.exports = (env, { mode }) => {
  const isDev = mode === "development";

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      })
    );
  }

  return {
    entry: "./src/main.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /[\\/]node_modules[\\/]/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins,
  };
};
