const validateEvent = require("../../validate/event")
const { replace, trim } = require("ramda")
const shortId = require("shortid")
const PouchDB = require("pouchdb");
const db = new PouchDB(process.env.DB_URL);


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

function buildEvent({ name, band }) {
  const removeSpaces = str => replace(/ /, "_", trim(str))
  const updated = {
    _id: `event_${removeSpaces(band)}_${shortId()}`,
    type: "event",
    schedule: [],
    contacts: [],
    band: band,
    name: name
  }
  return updated
}
