// Transpile all code following this line with babel

require('babel-register')({
  presets: ['env', "react"]
});


module.exports = require('./server/app.js');