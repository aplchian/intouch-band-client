const axios = require('axios')

module.exports = {
  getAllEvents
}

function getAllEvents(band){
  return axios(`http://localhost:3090/events/${band}`)
}

