const PouchDB = require("pouchdb")
PouchDB.plugin(require("pouchdb-find"))
const db = new PouchDB(process.env.DB_URL)
const { sort } = require("ramda")
const moment = require("moment")

module.exports = { getAllEvents }

function getAllEvents(band) {
  return db
    .createIndex({
      index: { fields: ["band", "type"] }
    })
    .then(function() {
      return db.find({
        selector: {
          band: { $eq: band },
          type: { $eq: "event" }
        }
      })
    })
    .then(sortDocs)
}

function sortDocs({ docs }) {
  const sortEm = (a, b) =>
    moment(a.date, "YYYY-MM-DD").unix() - moment(b.date, "YYYY-MM-DD").unix()
  const sortedEvents = sort(sortEm, docs)
  return { docs: sortedEvents }
}
