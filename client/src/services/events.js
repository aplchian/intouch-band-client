const axios = require("axios")

module.exports = {
  getAllEvents
}

const baseURL =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? process.env.REACT_APP_API_PROD
    : process.env.REACT_APP_API_DEV

// https://intouch-band-api-snhldtdgxg.now.sh/events/${band}

function getAllEvents(band) {
  return axios(`${baseURL}/events/${band}`)
}
