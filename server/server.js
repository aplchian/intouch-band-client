require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const { getAllEvents } = require('./entities/events/getEvents')
const cors = require('cors')
app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send({ ok: true })
})

app.get('/events/:band', (req, res) => {
  getAllEvents(req.params.band)
    .then(docs => {
      console.log('docs', docs)
      res.status(200).send(docs)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(3090, () => {
  console.log('server listening on 3090')
})
