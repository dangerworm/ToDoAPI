const { Client } = require('pg')
const dbClient = new Client({
  connectionString: process.env['TO_DO_DM_DATABASE_URI'],
  ssl: {
    rejectUnauthorized: false
  }
})

dbClient.connect()

const getTasksQuery = 'SELECT * FROM public.tasks ORDER BY task_id ASC'

const getTasks = (request, response) => {
  dbClient.query(getTasksQuery, (error, results) => {
    if (error) {
      console.log(error.stack)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getTasks
}