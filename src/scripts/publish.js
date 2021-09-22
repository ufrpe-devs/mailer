const ghpages = require('gh-pages');
const path = require('path');

module.exports = ({ subject }) =>
  new Promise((resolve) => {
    ghpages.publish(
      path.join(__dirname, '../../build'),
      { add: true, message: subject, src: path.join(__dirname, '../../build') },
      (err) => {
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      }
    );
  });
