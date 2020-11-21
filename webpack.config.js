const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";

const loadPlugins = () => {
  const plugins = [
    new LoadablePlugin({
      writeToDisk: true,
      filename: "./loadable-stats.json",
    }),
    new webpack.DefinePlugin({
      CLIENT: true,
      DEV: isDev,
      "process.env": {
        API_URL: JSON.stringify(process.env.API_URL),
        GOOGLE_MAP_API_KEY: JSON.stringify(process.env.GOOGLE_MAP_API_KEY),
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash:8].css",
      chunkFilename: isDev ? "[id].css" : "[id].[contenthash:8].css",
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-au/),
  ];

  if (isDev) {
    plugins.push(
      // webpack-hot-middleware
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode:
          process.env.NODE_ENV === "analyze" ? "server" : "disabled",
      })
    );
  }

  return plugins;
};

module.exports = {
  devtool: isDev ? "eval-source-map" : false,
  entry: isDev
    ? ["webpack-hot-middleware/client?reload=true", "./src/client.tsx"]
    : ["./src/client.tsx"],
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: isDev,
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev, reloadAll: true },
          },
          { loader: "css", options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css", options: { importLoaders: 3 } },
          {
            loader: "less",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        use: {
          loader: "url",
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    filename: isDev ? "[name].js" : "[name].[hash:8].js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
  plugins: loadPlugins(),
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
      assets: path.resolve(__dirname, "assets"),
      components: path.resolve(__dirname, "src/components"),
      config: path.resolve(__dirname, "src/config"),
      containers: path.resolve(__dirname, "src/containers"),
      helpers: path.resolve(__dirname, "src/helpers"),
      "redux/actions": path.resolve(__dirname, "src/redux/actions"),
      "redux/actionTypes": path.resolve(__dirname, "src/redux/actionTypes"),
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
