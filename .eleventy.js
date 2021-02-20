module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy('_assets');
  
  return {
    markdownTemplateEngine: "ejs",
    dir: {
      layouts: '_layouts'
    }
  }
};
