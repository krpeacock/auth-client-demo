const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dfxConfig = require("./dfx.json");

function initCanisterEnv() {
  let localCanisters, prodCanisters;
  try {
    localCanisters = require(path.resolve(
        ".dfx",
        "local",
        "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
      process.env.DFX_NETWORK ||
      (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterConfig = network === "local" ? localCanisters : prodCanisters;

  return Object.entries(canisterConfig).reduce((prev, current) => {
    const [canisterName, canisterDetails] = current;
    prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
        canisterDetails[network];
    return prev;
  }, {});
}
const canisterEnvVariables = initCanisterEnv();

const isDevelopment = process.env.NODE_ENV !== "production";

// Updated for new default with dfx 0.12.x
const REPLICA_PORT =
    dfxConfig.networks?.local?.bind?.split(":")[1] ??
    process.env.DFX_REPLICA_PORT ??
    "4943";

const frontend_directory = "auth_client_demo_assets";

const asset_entry = path.join(
    "src",
    frontend_directory,
    "src",
    "index.html"
);

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".ts"),
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", frontend_directory),
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  module: {
    rules: [
      { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      cache: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV ?? "development",
      DFX_NETWORK: process.env.DFX_NETWORK ?? "local",
      LOCAL_II_CANISTER: `http://${canisterEnvVariables["INTERNET_IDENTITY_CANISTER_ID"]}.localhost:${REPLICA_PORT}/#authorize`,
      REPLICA_PORT,
      ...canisterEnvVariables,
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
  ],
  // proxy /api to local replica during development
  devServer: {
    proxy: {
      "/api": {
        target:
            `http://${dfxConfig.networks?.local?.bind}` ??
            `http://127.0.0.1:${REPLICA_PORT}`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    static: path.resolve(__dirname, "src", frontend_directory, "assets"),
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontend_directory)],
    liveReload: true,
  },
};
