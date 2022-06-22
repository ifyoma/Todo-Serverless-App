import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
// import { getUserId } from '../utils';

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log("Processing event: ", event);

    const todos = await docClient.scan({
      TableName: todosTable
    }).promise()

    const items = todos.Items

    return {
      statusCode: 200,
      body: JSON.stringify({ items })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)