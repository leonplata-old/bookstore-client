const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',

    files: [{ pattern: 'src/**/*.spec.js', watched: true }],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
    },

    reporters: ['progress'],

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    port: 9876,

    singleRun: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    phantomjsLauncher: {
      exitOnResourceError: true,
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline',
      },
    },
  });
};
