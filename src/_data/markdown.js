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
  // Usage: markdown(content)
  const render = md.render.bind(md);

  // Usage: markdown.inline(content);
  render.inline = md.renderInline.bind(md);
  return render;
};
