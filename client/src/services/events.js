const axios = require('axios')

module.exports = {
  getAllEvents
}

// https://intouch-band-api-qewpgmvgep.now.sh/events/${band}
// const 

function getAllEvents(band){
  return axios(`https://intouch-band-api-snhldtdgxg.now.sh/events/${band}`)
}

