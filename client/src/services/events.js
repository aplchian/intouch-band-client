const axios = require('axios')

module.exports = {
  getAllEvents
}

// https://intouch-band-api-qewpgmvgep.now.sh/events/${band}
// const 

function getAllEvents(band){
  return axios(`http://localhost:3090/events/${band}`)
}

