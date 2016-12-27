/**
 * Karma Configuration.
 */

const _ = require('lodash');
const conf = require('./karma.common.conf.js');

module.exports = (config) => {
  config.set(_.extend(conf(config), {
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  }));
};
