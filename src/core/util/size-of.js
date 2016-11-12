import {keys} from './keys.js';
import {isArrayLike} from './is-array-like.js';
import {isString} from './is-string.js';
import {isNil} from './is-nil.js';
import {isObject} from './is-object.js';

/**
 * Get the `size` of a given value:
 * - The length value for an array (or an array-like) object.
 * - The number of properties for an object.
 *
 * @param {*} obj Value to get the size.
 * @return {number} The computed size.
 */
export function sizeOf(obj) {
  let size = -1;

  if (isNil(obj)) {
    size = 0;
  } else if (isString(obj) || isArrayLike(obj)) {
    size = obj.length;
  } else if (isObject(obj)) {
    size = keys(obj).length;
  }

  return size;
}
