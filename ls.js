const fs = require('fs');

function ls(args, options, logger) {
  if (args.length === 0) {
    args.push('./');
  }

  fs.readdir(...args, options, (err, files) => {
    if (err) {
      logger(err.message);
    } else {
      logger(files.join(','));
    }
  });
}

module.exports = ls;
