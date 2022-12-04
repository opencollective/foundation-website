const fs = require('fs');
const path = require('path');
const less = require('less');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const cssNano = require('cssnano');
const LessRenderer = require('./LessRenderer');

const permalink = 'compensation-frame.css';
const input = './compensation-frame.less';

/**
 * This reads a single LESS file from `input` and outputs a single CSS file to `permalink`.
 * It is expected that the LESS file will have imports to other LESS files.
 */
module.exports = class AllStyles extends LessRenderer {
  constructor() {
    super({ input, permalink });
  }
};
