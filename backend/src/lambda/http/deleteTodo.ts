import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodo } from '../../helpers/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('DeleteTodo')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Deleting todo item: ', { event })

  // TODO: Remove a TODO item by id
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId

  await deleteTodo(userId, todoId)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: `Todo item ${todoId} was deleted successfully!`
    })
  }
}
