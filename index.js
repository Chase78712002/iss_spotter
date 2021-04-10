const { nextISSTimesForMyLocation } = require('./iss');
const dayjs = require('dayjs');

const printFlyoverTimes = (passTimes) => {
  for (const time of passTimes) {
    let date = dayjs.unix(time.risetime);
    let duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It did't work!!", error);
  }
  printFlyoverTimes(passTimes);
})


// fetchMyIP((err, IP) => {
//   if (err) {
//     console.log("It didn't work!", err);
//   } else {
//     console.log(`It worked! Here's your IP: ${IP}`);
//   }
// })

// fetchCoordsByIP('108.172.211.25', (err, data) => {
//   if (err) {
//     console.log('OH NOOO ERRORRRR', err);
//   } else {
//     console.log("It worked! Here are the coordinates:", data);
//   }
// });

// fetchISSFlyOverTimes({ latitude: 49.2643, longitude: -123.0961 }, (err, data) => {
//   if (err) {
//     console.log('OH NOOO ERRORRRR!!!!', err);
//   } else {
//     console.log("It worked! Here are the flyover times:", data);
//   }
// });