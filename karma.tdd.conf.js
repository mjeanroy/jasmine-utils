/**
 * Karma Configuration.
 */

const _ = require('lodash');
const conf = require('./karma.common.conf.js');

module.exports = (config) => {
  config.set(_.extend(conf(config), {
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 10000,
    singleRun: false,
    reportSlowerThan: 2000,
  }));
};
