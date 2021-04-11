const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
}

const fetchCoordsByIP = (ipInJSON) => {
  const ip = JSON.parse(ipInJSON).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = (coordsInJSON) => {
  const coords = JSON.parse(coordsInJSON)
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((flyOverTimesInJSON) => {
      const flyOverTimes = JSON.parse(flyOverTimesInJSON).response;
      return flyOverTimes;
    })
}





module.exports = {
  nextISSTimesForMyLocation
}