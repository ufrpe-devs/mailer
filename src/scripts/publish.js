const ghpages = require('gh-pages');

module.exports = ({ subject }) =>
  new Promise((resolve) => {
    ghpages.publish(
      'build',
      { add: true, message: subject, src: '**/*.html', branch: 'gh-pages' },
      (err) => {
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      }
    );
  });
