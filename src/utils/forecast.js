const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=753a6d70a64495e37876ce9d3e9f3eec&units=m&query=${latitude},${longitude}`;
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = forecast;