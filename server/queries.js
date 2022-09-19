const { Client } = require('pg')
const dbClient = new Client({
  connectionString: process.env['TO_DO_DM_DATABASE_URI'],
  ssl: {
    rejectUnauthorized: false
  }
})

dbClient.connect()

const getTasksQuery = 'SELECT * FROM public.tasks ORDER BY task_id ASC'
const getTaskQuery = 'SELECT * FROM public.tasks WHERE task_id = $1'

const getTasks = (request, response) => {
  dbClient.query(getTasksQuery, (error, results) => {
    if (error) {
      console.log(error.stack)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTaskById = (request, response) => {
  dbClient.query({
    text: getTaskQuery,
    values: [request.params.id],
    rowMode: 'array',
  }, (error, results) => {
    if (error) {
      console.log(error.stack)
      throw error
    }
    response.status(200).json(results.rows[0])
  })
}

module.exports = {
  getTasks,
  getTaskById
}