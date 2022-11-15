const Image = require('@11ty/eleventy-img');
const path = require('path');

const FALLBACK_IMAGE = './src/assets/images/transparent-pixel.png';

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
      sharpJpegOptions: {
        background: '#ebfdfe',
      },
      outputDir: './_site/assets-compressed',
      urlPath: '/assets-compressed/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w-${id}.${format}`;
      },
      useCache: true,
    };

    let metadata;
    try {
      metadata = await Image(filePath, options);
    } catch (e) {
      console.error('Error creating image. Falling back.', e);
      metadata = await Image(FALLBACK_IMAGE, options);
    }

    return Image.generateHTML(metadata, attributes);
  };
