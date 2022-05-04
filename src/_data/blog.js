let Parser = require('rss-parser');
let parser = new Parser();

module.exports = async () => {
  return parser.parseURL('https://blog.opencollective.com/tag/ocf/rss/');
};
