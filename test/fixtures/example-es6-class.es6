/* eslint-disable */
'use strict';

/**
 * This is meant to replicate a real-world babel transformed class that isn't using the 'loose'
 * preset. It is not meant to be imported by any tests. The transformed file is included in the
 * karma.conf.js
 */

class ExampleEs6Class {
  methodOne() {

  }
  methodTwo() {

  }
}
// Needed to attach it to the window object to access it
window.ExampleEs6Class = ExampleEs6Class;