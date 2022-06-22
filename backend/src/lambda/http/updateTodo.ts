import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
// import * as AWS from 'aws-sdk'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { updateTodo } from '../../businessLogic/todos'
// import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
// import { getUserId } from '../utils'

// const docClient = new AWS.DynamoDB.DocumentClient()
// const todosTable = process.env.TODOS_TABLE

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing event: ", event);

    // const todoId = event.pathParameters.todoId
    // const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object


    return undefined
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
