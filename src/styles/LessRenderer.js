const fs = require('fs');
const path = require('path');
const less = require('less');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const cssNano = require('cssnano');

/**
 * This reads a single LESS file from `input` and outputs a single CSS file to `permalink`.
 * It is expected that the LESS file will have imports to other LESS files.
 */
module.exports = class LessRenderer {
  constructor({ input, permalink }) {
    this.input = input;
    this.permalink = permalink;
  }
  async data() {
    const rawFilepath = path.join(__dirname, this.input);
    return {
      permalink: this.permalink,
      rawFilepath,
      rawLess: (await fs.readFileSync(rawFilepath)).toString(),
    };
  }

  async render({ rawLess, rawFilepath, site }) {
    const lessResult = await less.render(rawLess, { filename: rawFilepath });
    const plugins = [atImport, autoprefixer];
    if (site.environment !== 'development') {
      plugins.push(cssNano);
    }
    const postcssResult = await postcss(plugins).process(lessResult.css, {
      from: this.input,
    });
    return postcssResult.css;
  }
};
