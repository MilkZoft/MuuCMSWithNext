const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[name]__[local]___[hash:base64:5]"
  }
});
