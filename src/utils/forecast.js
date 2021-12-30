const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b577113ace1e10f96ef137cd56a20a8b&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is " +
          body.current.temperature +
          " degrees. It feels like " +
          body.current.feelslike +
          " degrees outside"
      );
    }
  });
};

module.exports = forecast;
