import {negateMessage} from './negate-message.js';

/**
 * This factory will create a matcher supported by Jasmine 1.3.X.
 *
 * This factory takes a generic matcher function (matcher defined in this project)
 * and returns the matcher that can be used with Jasmine 1.3.
 *
 * @param {function} fn Generic matcher function.
 * @return {function} Jasmine 1.3 official matcher.
 * @see https://jasmine.github.io/1.3/introduction#section-Writing_a_custom_matcher
 */
export function jasmine1MatcherFactory(fn) {
  /**
   * Jasmine 1.3.X matcher.
   *
   * @return {boolean} The result of the expectation.
   */
  return function jasmine1Matcher(...args) {
    // The `this` object is equals to the current test context.
    const env = this.env;
    const equals_ = this.env.equals_;
    const actual = this.actual;
    const isNot = this.isNot;

    const ctx = {
      actual: this.actual,
      isNot: this.isNot,

      // Adapter for `callCount`
      // https://jasmine.github.io/1.3/introduction#section-Spies
      callCount(spy) {
        return spy.callCount;
      },

      // Adapter for `argsFor`
      // https://jasmine.github.io/1.3/introduction#section-Spies
      argsFor(spy, call) {
        return spy.argsForCall[call];
      },

      // Adapter for custom equality.
      equals(...equalsArgs) {
        return equals_.apply(env, equalsArgs);
      }
    };

    const result = fn.apply(ctx, [ctx].concat(args));

    if (!result.pass) {
      this.message = function() {
        return negateMessage(isNot, result.message);
      };
    }

    return result.pass;
  };
}
