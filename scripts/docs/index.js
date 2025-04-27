/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
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

const fs = require('fs/promises');
const path = require('path');
const touch = require('touch');
const dox = require('dox');
const Handlebars = require('handlebars');
const { glob } = require('glob');
const log = require('../log');
const config = require('../config');

module.exports = function docs(done) {
  listFiles(path.join(config.src, 'core', 'matchers'))
    .then((files) => readJsDoc(files))
    .then((comments) => generateMarkdown(comments))
    .then((result) => writeMarkdown(result))

    .catch((err) => {
      log.error(`Error occured while generating documentation: ${err}`);
    })

    .finally(() => {
      done();
    });
};

/**
 * Read JS Doc from given input files.
 *
 * @param {Array<string>} files Given input files.
 * @return {Promise<Array<Object>>} The promise, resolved with JS Doc comments.
 */
function readJsDoc(files) {
  return Promise.all(
    files.map((file) => (
      readFile(file).then((content) => {
        const jsdoc = dox.parseComments(content, { raw: true });
        const api = keepFunctions(jsdoc);
        return parseComments(api);
      })
    )),
  );
}

/**
 * Generate documentation markdown.
 *
 * @param {Array<Object>} comments The comments, as structured object.
 * @return {Promise<string>} The promise, resolved with generated documentation.
 */
function generateMarkdown(comments) {
  return readFile(path.join(__dirname, 'readme-template.txt'))
    .then((template) => Handlebars.compile(template))
    .then((templateFn) => (
      templateFn({
        matchers: comments.map((comment) => comment[0]),
      })
    ));
}

/**
 * Write the markdown documentation to the `README` file.
 *
 * @param {string} result The markdown documentation.
 * @return {Promise<Void>} The done promise.
 */
function writeMarkdown(result) {
  return writeFile(config.readme, result);
}

/**
 * List all files in a directory asynchronously.
 * This function returns a promise resolved with the list of files in the
 * directory or rejected with the error.
 *
 * @param {string} dir The directory.
 * @returns {Promise} The promise.
 */
function listFiles(dir) {
  return glob(path.join(dir, '**', '*.js')).then((files) => (
    files.filter((f) => path.basename(f) !== 'index.js').sort((f1, f2) => (
      path.basename(f1).localeCompare(path.basename(f2))
    ))
  ));
}

/**
 * Read a file asynchronously.
 * This function returns a promise resolved with the file content or rejected with
 * the error.
 *
 * @param {string} file The full path.
 * @return {Promise} The promise.
 */
function readFile(file) {
  log.debug(`Reading: ${file}`);
  return fs.readFile(file, 'utf-8');
}

/**
 * Write a file asynchronously.
 * This function returns a promise resolved when the file is successfully written
 * or rejected with the error.
 *
 * @param {string} file The full path.
 * @param {string} content File content.
 * @return {Promise} The promise.
 */
function writeFile(file, content) {
  return touch(file).then(() => (
    fs.writeFile(file, content, 'utf-8')
  ));
}

/**
 * Filter a list of comments object to keep only functions.
 *
 * @param {Array<Object>} comments List of comments.
 * @returns {Array<Object>} The array containing only jsdoc of functions.
 */
function keepFunctions(comments) {
  return comments.filter((comment) => (
    !!comment.ctx && comment.ctx.type === 'function'
  ));
}

/**
 * Trim value (null safe).
 *
 * @param {string|null|undefined} value Value to trim, may be `null`.
 * @returns {string|null|undefined} Trimmed value.
 */
function trim(value) {
  return value ? value.trim() : value;
}

/**
 * Trim all lines in a block of text.
 *
 * @param {string} txt Block of text.
 * @return {string} The same text with all lines trimmed.
 */
function trimAll(txt) {
  return txt.split('\n').map((line) => trim(line)).join('\n');
}

/**
 * Group all values in an array, where the key is retrieved through the `valueFn` function.
 *
 * @param {Array<any>} array Given array.
 * @param {function} valueFn Value mapper, use to get the grouping key.
 * @return {Map<any,any>} Map where values are grouped per keys.
 */
function groupBy(array, valueFn) {
  const output = new Map();

  for (let i = 0; i < array.length; ++i) {
    const v = array[i];
    const k = valueFn(v);

    if (!output.has(k)) {
      output.set(k, []);
    }

    output.get(k).push(v);
  }

  return output;
}

/**
 * Parse a comments block object to keep only interesting information to use
 * in the documentation template.
 *
 * @param {Array<Object>} comments Comments.
 * @returns {Array<Object>} The new comments.
 */
function parseComments(comments) {
  return comments.map((comment) => {
    const tags = groupBy(comment.tags, (t) => t.type);
    return {
      name: comment.ctx.name,
      description: trim(comment.description.full),
      code: comment.code,

      since: (tags.get('since') || [])
        .map((node) => node.string)
        .map((txt) => trimAll(txt))
        .at(0),

      messages: (tags.get('message') || [])
        .map((node) => node.string)
        .map((txt) => trimAll(txt)),

      examples: (tags.get('example') || [])
        .map((node) => node.string)
        .map((txt) => trimAll(txt)),

      params: (tags.get('param') || [])
        .slice(1)
        .map((param) => Object.assign(param, {
          types: param.types.length === 0 ? ['*'] : param.types,
        })),
    };
  });
}
