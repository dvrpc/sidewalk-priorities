const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    main_landing_page: path.resolve(__dirname, "./src/index.js"),
    main_map: path.resolve(__dirname, "./src/map.js"),
  },

  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Sidewalk Priorities",
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      chunks: ["main_landing_page"],
    }),
    new HtmlWebpackPlugin({
      title: "Sidewalk Priorities",
      template: path.resolve(__dirname, "./src/map.html"),
      filename: "map.html",
      chunks: ["main_map"],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/img",
          to: "img",
          toType: "dir",
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./docs"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  resolve: {
    fallback: {
      fs: false,
    },
  },
};
