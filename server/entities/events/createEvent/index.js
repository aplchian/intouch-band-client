const validateEvent = require("../../validate/event")
const { replace, trim, assoc } = require("ramda")
const shortId = require("shortid")
const PouchDB = require("pouchdb")
const db = new PouchDB(process.env.DB_URL)

module.exports = async event => {
  const updatedEvent = buildEvent(event)
  const msg = await validateEvent(updatedEvent)
  const format = replace(/instance./g, "")

  if (msg.errors.length > 0) {
    throw new Error(format(msg.errors[0].stack))
  } else {
    return db.put(updatedEvent).then(res => db.get(res.id))
  }
}

function buildEvent(event) {
  const removeSpaces = str => replace(/ /, "_", trim(str))
  if (!event.name || !event.band) {
    return {
      _id: "",
      type: "event",
      schedule: [],
      files: [],
      contacts: [],
      band: event.band,
      name: event.name,
      date: event.date,
      confirmed: false
    }
  } else {
    return {
      _id: `event_${removeSpaces(event.band)}_${shortId()}`,
      type: "event",
      schedule: [],
      contacts: [],
      files: [],
      band: event.band,
      name: event.name,
      date: event.date,
      confirmed: false
    }
  }
}
