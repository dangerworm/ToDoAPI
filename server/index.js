const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const queries = require('./queries')
const mutations = require('./mutations')

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

app.get('/tasks', queries.getTasks)
app.get('/tasks/create', mutations.createTask)
app.get('/tasks/:id', queries.getTaskById)
app.get('/tasks/complete/:id', mutations.completeTaskById)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

