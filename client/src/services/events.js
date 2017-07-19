const axios = require('axios')

module.exports = {
  getAllEvents
}

function getAllEvents(band){
  return axios(`https://intouch-band-api-qewpgmvgep.now.sh/events/${band}`)
}

