const axios = require("axios")

// 3090

var api = axios.create({
  baseURL: process.env.REACT_APP_API,
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

export function updateEvent(event) {
  return api.put(`/events`, { event })
}

export function deleteEvent(eventID) {
  return api.delete(`/events/${eventID}`)
}
