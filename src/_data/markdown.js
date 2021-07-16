const md = require('markdown-it')('commonmark');
var mila = require('markdown-it-link-attributes');

md.use(mila, {
  pattern: /^https?:\/\//,

  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
});

md.enable('table');

module.exports = () => {
  return md.render.bind(md);
};
