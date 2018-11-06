const request = require('request');

function curl(args, options, logger) {
  request.get(...args, (err, data) => {
    if (err) {
      logger(err.message);
    } else {
      logger(data.body);
    }
  });
}

module.exports = curl;
