const { Client } = require('pg')
const { RowDescriptionMessage } = require('pg-protocol/dist/messages')
const dbClient = new Client({
  connectionString: process.env['TO_DO_DM_DATABASE_URI'],
  ssl: {
    rejectUnauthorized: false
  }
})

dbClient.connect()

const createTaskMutation = 'INSERT INTO public.tasks\
  (title, description, tags, urgency_hours, repeats, repeats_hours, repeats_start)\
VALUES\
  ($1, $2, $3, $4, $5, $6, $7);'

const completeTaskMutation = 'INSERT INTO public.task_completions\
  (task_id)\
VALUES\
  ($1);'

const createTask = (request, response) => {
  dbClient.query({
    text: createTaskMutation,
    values: [
      request.params.title,
      request.params.description,
      request.params.tags,
      request.params.urgency_hours,
      request.params.repeats,
      request.params.repeats_hours,
      request.params.repeats_start
    ],
    rowMode: 'array',
  }, (error, results) => {
    if (error) {
      console.log(error.stack)
      throw error
    }
    response.status(201).json({result: `Task created with ID '${results.rows[0].task_id}'`})
  })
}

const completeTaskById = (request, response) => {
  dbClient.query({
    text: completeTaskMutation,
    values: [request.params.id],
    rowMode: 'array',
  }, (error, results) => {
    if (error) {
      console.log(error.stack)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  createTask,
  completeTaskById
}