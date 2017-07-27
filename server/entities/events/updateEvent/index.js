const validateEvent = require("../../validate/event")
const { replace, trim, assoc } = require("ramda")
const shortId = require("shortid")
const PouchDB = require("pouchdb")
const sortEventSchedule = require('../../utilities/helpers/sortEventSchedule')
const db = new PouchDB(process.env.DB_URL)

module.exports = async event => {
  const msg = await validateEvent(event)
  const format = replace(/instance./g, "")

  if (msg.errors.length > 0) {
    throw new Error(format(msg.errors[0].stack))
  } else {
    const updatedEvent = sortEventSchedule(event)
    return db.put(updatedEvent).then(res => db.get(res.id))
  }
}

