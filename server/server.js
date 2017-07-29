require("dotenv").config()
const app = require("express")()
const bodyParser = require("body-parser")
const { getAllEvents } = require("./entities/events/getEvents")
const createEvent = require("./entities/events/createEvent")
const updateEvent = require("./entities/events/updateEvent")
const createError = require("http-errors")
const deleteDoc = require('./entities/base/deleteDoc')

const cors = require("cors")
app.use(bodyParser.json())

app.use(cors())

app.get("/", (req, res) => {
  res.send({ ok: true })
})

app.get("/events/:band", (req, res) => {
  getAllEvents(req.params.band)
    .then(docs => {
      // console.log("docs", docs)
      res.status(200).send(docs)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.post("/events", async (req, res, next) => {
  try {
    const event = await createEvent(req.body.event)
    res.status(200).send(event)
  } catch (error) {
    return next(createError(400, error.message))
  }
})

app.put("/events", async (req, res, next) => {
  try {
    const event = await updateEvent(req.body.event)
    console.log("event", event)
    res.status(200).send(event)
  } catch (error) {
    return next(createError(400, error.message))
  }
})

app.delete("/events/:id", async (req, res, next) => {
  try {
    const resp = await deleteDoc(req.params.id)
    res.status(200).send(resp)
  } catch (error) {
    return next(createError(400, error.message))
  }
})

app.listen(3090, () => {
  console.log("server listening on 3090")
})

app.use(function(err, req, res, next) {
  res.status(err.status).send(err)
})
