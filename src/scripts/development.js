const express = require('express');
const reload = require('reload');

const render = require('./core');

const app = express();

const development = {
  script: '<script src="/reload/reload.js"></script>',
};

app.get('/', (req, res) => {
  const rendered = render({ development });
  res.send(rendered);
});

reload(app)
  .then(() => {
    app.listen(3000, () => {
      console.log('⚡ server started - http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('⚡ Failed to start the server', err);
  });
