/**
 * Grunt build file.
 */

'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      // Continuous integration mode: run tests once in PhantomJS browser.
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: [
          'PhantomJS'
        ]
      },
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/*.js'
      ]
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false
      }
    }
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  // Default task(s).
  grunt.registerTask('build', [
    'jshint',
    'karma:continuous'
  ]);

  grunt.registerTask('release', function(level) {
    var lvl = level || 'minor';
    grunt.task.run('build');
    grunt.task.run('bump:' + lvl);
  });

  grunt.registerTask('default', ['build']);
};