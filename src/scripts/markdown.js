const marked = require('marked');

const renderer = {
  link(href, _, text) {
    return `
    <a href="${href}" style="color:#e50d70;text-decoration:underline;">${text}</a>
  `;
  },
};

marked.use({ renderer });

module.exports = marked;
