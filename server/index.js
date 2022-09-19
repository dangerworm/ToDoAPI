const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const db = require('./queries')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API'})
})

app.get('/tasks', db.getTasks)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

