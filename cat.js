const fs = require('fs');

function cat(args, options, logger) {
  if (options.length === 0) {
    logger('Error: filename not passed');
  } else {
    fs.readFile(...args, ...options, (err, data) => {
      if (err) {
        logger(err);
      } else {
        logger(data);
      }
    });
  }
}

module.exports = cat;
