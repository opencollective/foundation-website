const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = () =>
  /**
   * Create image HTML tag and compress images
   * @param {Object} attributes - Attributes for img tag, including src
   * @param {*} baseWidths Widths in css pixels to create
   * @returns picture tag html
   */
  async function image(attributes, baseWidths) {
    const { src } = attributes;
    // if it's a local path, resolve it
    let filePath = src.startsWith('/')
      ? path.resolve(__dirname, '..', src.substring(1))
      : src;

    // Take each base width and multiply it by supported pixel densities
    const widths = baseWidths.flatMap((width) => [width, width * 2]);

    // include full size version
    widths.push(null);

    const options = {
      widths,
      formats: ['webp', 'jpeg'],
      outputDir: './_site/assets-compressed',
      urlPath: '/assets-compressed/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w-${id}.${format}`;
      },
      useCache: true,
    };

    let metadata = await Image(filePath, options);

    return Image.generateHTML(metadata, attributes);
  };
