import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
// import * as AWS from 'aws-sdk'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { deleteTodo } from '../../businessLogic/todos'
// import { getUserId } from '../utils'

// const docClient = new AWS.DynamoDB.DocumentClient()
// const todosTable = process.env.TODOS_TABLE

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // const todoId = event.pathParameters.todoId

    console.log("Processing event: ", event);

    // TODO: Remove a TODO item by id

    return undefined
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
