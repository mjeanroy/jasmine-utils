/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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

import {isDate} from './is-date.js';
import {isNumber} from './is-number.js';
import {isString} from './is-string.js';
import {now} from './now.js';

const _dateParse = Date.parse;

const SUPPORT_ISO_8601 = (() => {
  return !!_dateParse &&
    !!_dateParse('2017') &&
    !!_dateParse('2017-01') &&
    !!_dateParse('2017-01-01') &&
    !!_dateParse('2017-01-01T10:00') &&
    !!_dateParse('2017-01-01T10:00:00') &&
    !!_dateParse('2017-01-01T10:00:00.000') &&
    !!_dateParse('2017-01-01T10:00:00.000Z');
})();

const _parse = SUPPORT_ISO_8601 ? _dateParse : (() => {
  // eslint-disable-next-line max-len
  const REGEX_ISO8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

  const TZ_OFFSET = -(now().getTimezoneOffset());
  const H_OFFSET = Math.floor(TZ_OFFSET / 60);
  const M_OFFSET = TZ_OFFSET % 60;

  return function(v) {
    const m = REGEX_ISO8601.exec(v);

    if (m) {
      let hoursOffset = H_OFFSET;
      let minutesOffset = M_OFFSET;

      const hasTimeZone = !!m[8];
      if (hasTimeZone) {
        const hasSpecificTz = !!m[9];
        hoursOffset = hasSpecificTz ? Number(m[9] + m[10]) : 0;
        minutesOffset = hasSpecificTz ? Number(m[9] + m[11]) : 0;
      }

      const year = Number(m[1]);
      const month = Number(m[2] || 1) - 1;
      const day = Number(m[3] || 1);
      const hours = Number(m[4] || 0) - hoursOffset;
      const minutes = Number(m[5] || 0) - minutesOffset;
      const seconds = Number(m[6] || 0);
      const millis = Number(((m[7] || 0) + '00').slice(0, 3));
      return Date.UTC(year, month, day, hours, minutes, seconds, millis);
    }

    // Call original.
    return _dateParse(v);
  };
})();

/**
 * Parse a date, that may be:
 * - A date instance.
 * - A timestamp (i.e a number, the number of milliseconds since 1970-01-01).
 * - A string, using ISO-8601 format or format described by RFC8822.
 *
 * If the format is not valid, an invalid date (initialized with `NaN`) will
 * be returned (the behavior of `Date` constructor).
 *
 * @param {Number|String|Date} date The date to parse.
 * @return {Date} The created date.
 */
export function parseDate(date) {
  if (isDate(date)) {
    return date;
  }

  if (isNumber(date)) {
    const d = new Date();
    d.setTime(date);
    return d;
  }

  if (isString(date)) {
    const tt = _parse(date);
    const d = new Date();
    d.setTime(tt);
    return d;
  }

  return new Date(date);
}
