const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// let indexConfig = new HtmlWebpackPlugin({
//   title: "Sidewalk Priorities",
//   template: path.resolve(__dirname, "./src/index.html"),
//   filename: "index.html",
//   minify: {
//     collapseWhitespace: true,
//     removeComments: true,
//     removeRedundantAttributes: true,
//     removeScriptTypeAttributes: false,
//     removeStyleLinkTypeAttributes: false,
//     useShortDoctype: true,
//   },
// });

module.exports = {
  mode: "production",

  entry: {
    main_landing_page: path.resolve(__dirname, "./src/index.js"),
    main_destination_map: path.resolve(
      __dirname,
      "./src/index_for_destination_map.js"
    ),
    main_municipal_map: path.resolve(
      __dirname,
      "./src/index_for_municipal_map.js"
    ),
  },

  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new CleanWebpackPlugin(),
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
    new HtmlWebpackPlugin({
      title: "Sidewalk Priorities",
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      chunks: ["main_landing_page"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: "Sidewalk Priorities",
      template: path.resolve(__dirname, "./src/destination.html"),
      filename: "by-destination.html",
      chunks: ["main_destination_map"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: "Sidewalk Priorities",
      template: path.resolve(__dirname, "./src/municipality.html"),
      filename: "by-municipality.html",
      chunks: ["main_municipal_map"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true,
      },
    }),
  ],

  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },

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
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
