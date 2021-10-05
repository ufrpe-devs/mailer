const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    add: true,
    message: 'update',
    src: ['**/*.html', '**/*.png'],
    branch: 'gh-pages',
  },
  (err) => {
    if (err) {
      console.log(err);
      resolve(false);
    }
    resolve(true);
  }
);
