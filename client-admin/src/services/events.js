const axios = require("axios")

var api = axios.create({
  baseURL: "http://localhost:3090",
  timeout: 10000
})

export function getAllEvents(band) {
  return api.get(`/events/${band}`)
}

export function createEvent(event) {
  return api.post(`/events`, {
    event: {
      band: "band_Stop_Light_Observations",
      ...event
    }
  })
}
