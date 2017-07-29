const PouchDB = require("pouchdb")
const db = new PouchDB(process.env.DB_URL)

module.exports = deleteDoc

function deleteDoc(id) {
  console.log("id1", id)
  return db.get(id).then(res => db.remove(res))
}
