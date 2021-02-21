const sortBy = require('lodash/sortBy');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addWatchTarget('src/styles');

  eleventyConfig.addCollection('section', function (collectionApi) {
    // get unsorted items
    const raw = collectionApi.getFilteredByTag('section');
    return sortBy(raw, 'data.position');
  });

  return {
    markdownTemplateEngine: 'ejs',
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
  };
};
