const path = require('path');
const { alias } = require('react-app-rewire-alias');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  webpack(config, env) {
    if (env === 'development') {
      config.plugins.push(
        new StyleLintPlugin({
          configFile: path.resolve(__dirname, '.stylelintrc'),
          files: path.resolve(__dirname, 'src/styles/**/*.{sass,scss}'),
          failOnError: false,
        })
      );
    }

    alias({
      '@components': './src/components',
      '@styles': './src/styles',
    })(config);

    return config;
  },
};
