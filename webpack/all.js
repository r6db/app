/**
 * this config just re-exports the main/renderer config as array, so we can build it in one webpack run
 */
const main = require('./main');
const renderer = require('./renderer');

module.exports = [main, renderer];
