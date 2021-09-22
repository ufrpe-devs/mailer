const fs = require('fs');
const path = require('path');

const render = require('./core');

const rendered = render({ development: false });

fs.writeFileSync(path.join(__dirname, '../../build/', 'aaa.html'), rendered);
