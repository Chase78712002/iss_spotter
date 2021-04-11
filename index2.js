const { nextISSTimesForMyLocation } = require('./iss_promised');
const dayjs = require('dayjs');
const printFlyoverTimes = (passTimes) => {
  for (const time of passTimes) {
    let date = dayjs.unix(time.risetime);
    let duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printFlyoverTimes(passTimes);
  })
  .catch((error)=>{
    console.log("It didn't work: ", error.message);
  })


