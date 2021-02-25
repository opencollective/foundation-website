const fs = require('fs');
const path = require('path');
const less = require('less');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const cssNano = require('cssnano');

const permalink = 'styles.css';
const input = './styles.less';

/**
 * This reads a single LESS file from `input` and outputs a single CSS file to `permalink`.
 * It is expected that the LESS file will have imports to other LESS files.
 */
module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, input);
    return {
      permalink,
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
      from: input,
    });
    return postcssResult.css;
  }
};
