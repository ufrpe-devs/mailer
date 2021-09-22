const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const render = require('./core');

module.exports = (title) => {
  const slug = slugify(title);
  const id = `${new Date().toISOString().split('T')[0]}-${slug}`.toLowerCase();

  const metadata = {
    link: `https://ufrpe-devs.github.io/mailer/${id}.html`,
  };

  const rendered = render({ development: false, header: title, metadata });

  fs.writeFileSync(
    path.join(__dirname, '../../build/', `${id}.html`),
    rendered
  );
  return metadata;
};
