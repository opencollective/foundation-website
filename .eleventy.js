const sortBy = require('lodash/sortBy');

const md = require('markdown-it')('commonmark');
const mila = require('markdown-it-link-attributes');
const mic = require('markdown-it-container');
require('dotenv').config();

md.use(mila, [
  {
    pattern: /^https?:\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
]);

// Correspond to class names in markdown-containers.less
md.use(mic, 'break-inside-avoid');
md.use(mic, 'columns');
md.enable('table');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/compensation-frame');
  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addWatchTarget('src/styles');

  ['home', 'study'].forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, function (collectionApi) {
      // get unsorted items
      const raw = collectionApi.getFilteredByTag(collectionName);
      return sortBy(raw, 'data.position');
    });
  });

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy({ 'src/favicon_io': '/' });

  eleventyConfig.setBrowserSyncConfig({
    https: true,
  });

  eleventyConfig.setEjsOptions({
    async: true,
  });

  return {
    markdownTemplateEngine: 'ejs',
    htmlTemplateEngine: false, // stops compensation/index.html being mutated
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
  };
};
