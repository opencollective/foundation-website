const md = require('markdown-it')('commonmark');
var mila = require('markdown-it-link-attributes');

md.use(mila, {
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
});

module.exports = () => {
  return md.render.bind(md);
};
