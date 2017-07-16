const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB(process.env.DB_URL);

module.exports = { getAllEvents };

function getAllEvents(band) {
  return db
    .createIndex({
      index: { fields: ["band","type"] }
    })
    .then(function() {
      return db.find({
        selector: { 
          band: { $eq: band },
          type: { $eq: 'event' }
         }
      })
    })
}
