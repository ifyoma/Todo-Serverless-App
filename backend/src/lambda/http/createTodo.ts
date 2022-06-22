import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
// import { createTodo } from '../../businessLogic/todos'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const itemId = uuid.v4()
    const userId = getUserId(event)

    // TODO: Implement creating a new TODO item
    const newItem = {
      userId: userId,
      todId: itemId,
      createdAt: new Date(),
      ...newTodo
    }

    const result = await docClient.put({
      TableName: todosTable,
      Item: newItem
    }).promise()

    return {
      statusCode: 201,
      body: JSON.stringify({
        result
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
