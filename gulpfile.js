/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014,205,2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var KarmaServer = require('karma').Server;
var git = require('gulp-git');
var bump = require('gulp-bump');
var gulpFilter = require('gulp-filter');
var tag_version = require('gulp-tag-version');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var options = {
  root: __dirname,
  src: path.join(__dirname, 'src'),
  test: path.join(__dirname, 'test')
};

function startKarma(singleRun, done) {
  var opts = {
    configFile: path.join(options.root, '/karma.conf.js')
  };

  if (singleRun) {
    opts.singleRun = true;
    opts.browsers = ['PhantomJS'];
    opts.files = [
      {
        pattern: 'test/example-es6-class.js',
        watched: true,
        served: true,
        included: true
      },
      {
        pattern: 'test/*spec.js',
        watched: true,
        served: true,
        included: true
      }
    ];
  }

  var karma = new KarmaServer(opts, function() {
    done();
  });

  karma.start();
}

gulp.task('babel', function() {
  return gulp.src(options.test + '/*.es6' )
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(options.test));
});

gulp.task('lint', function() {
  return gulp.src(options.src + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function(done) {
  startKarma(true, done);
});

gulp.task('tdd', ['babel'], function(done) {
  startKarma(false, done);
});

// Release tasks
['minor', 'major', 'patch'].forEach(function(level) {
  gulp.task('release:' + level, ['build'], function() {
    var packageJsonFilter = gulpFilter(function(file) {
      return file.relative === 'package.json';
    });

    var distFilter = gulpFilter(function(file) {
      return file.relative === 'dist';
    });

    var src = ['package.json', 'bower.json'].map(function(file) {
      return path.join(options.root, file);
    });

    return gulp.src(src)
      .pipe(bump({type: level}))
      .pipe(gulp.dest(options.root))
      .pipe(git.add({args: '-f'}))
      .pipe(git.commit('release: release version'))
      .pipe(packageJsonFilter)
      .pipe(tag_version());
  });
});

gulp.task('release', ['release:minor']);
gulp.task('build', ['lint', 'babel', 'test']);
