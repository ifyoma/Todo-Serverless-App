import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

/**
 * Get all todo items function
 */

const logger = createLogger('getTodos')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Getting user todos: ', event)

  const userId = getUserId(event)
  const items = await getTodosForUser(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}