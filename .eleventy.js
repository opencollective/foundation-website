const sortBy = require('lodash/sortBy');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('_assets');

  eleventyConfig.addCollection('sections', function (collectionApi) {
    // get unsorted items
    const raw = collectionApi.getAll();
    return sortBy(raw, 'data.position');
  });

  return {
    markdownTemplateEngine: 'ejs',
    dir: {
      layouts: '_layouts',
    },
  };
};
