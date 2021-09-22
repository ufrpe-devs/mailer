const marked = require('marked');

const renderer = {
  link(href, _, text) {
    return `
    <a href="${href}" style="color: <%= theme.colors.textHighlight %>;text-decoration:underline;">${text}</a>
  `;
  },
};

marked.use({ renderer });

module.exports = marked;
