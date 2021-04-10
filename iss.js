// Fetch IP Address
const request = require('request');
const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (err, response, body) => {
    // pass error to callback function if there's an error
    if (err) {
      let errorMessage = `The following error has occurred ${err}`;
      callback(errorMessage, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const IP = JSON.parse(body).ip; // extract the IP from body, then pass the IP to callback
      callback(null, IP);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://freegeoip.app/json/', (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(body, null);
      return;
    }
    // Extract the coords
    const coords = {};
    coords.latitude = JSON.parse(body).latitude;
    coords.longitude = JSON.parse(body).longitude;
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    // handle error
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`Status Code error ${response.statusCode} ${body}`);
      return;
    }
    // extract response in the body
    const flyOverTime = JSON.parse(body)["response"];
    callback(null, flyOverTime);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  // fetch IP
  fetchMyIP((err, ip) => {
    if (err) {
      const errorMessage = `The following error has occured while fetching IP: ${err}`;
      callback(errorMessage, null);
    } else {
      // fetch Coords by IP
      fetchCoordsByIP(ip, (err, coords) => {
        if (err) {
          const errorMessage = `The following error has occured while fetching Coordinates: ${err}`;
          callback(errorMessage, null);
        } else {
          // fetch flyover time by Coords
          fetchISSFlyOverTimes(coords, (err, flyOverTimes) => {
            if (err) {
              const errorMessage = `The following error has occurred while fetching flyover times: ${err}`;
              callback(errorMessage, null);
            } else {
              callback(null, flyOverTimes);
            }
          })
        }
      })
    }
  })
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};