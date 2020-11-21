// Require hook for @babel/register
require("@babel/register")({
  plugins: ["dynamic-import-node"],
});

/**
 * Global variables
 */

// @ts-ignore
global.CLIENT = false;
// @ts-ignore
global.DEV = process.env.NODE_ENV === "development";

// Fonts
require("asset-require-hook")({
  // Must use the same option with webpack's configuration
  extensions: ["woff", "woff2", "ttf", "otf", "eot"],
  publicPath: "/assets/",
});

// Start Server
require("./src/server");
