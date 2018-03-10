const axios = require("axios")

module.exports = {
  getAllEvents
}

// https://intouch-band-api-snhldtdgxg.now.sh/events/${band}

function getAllEvents(band) {
  return axios(`${process.env.REACT_APP_API}/events/${band}`)
}
