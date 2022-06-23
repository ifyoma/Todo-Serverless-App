import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

const logger = createLogger('getTodos')

// TODO: Get all TODO items for a current user
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Write your code here
  logger.info('Getting user todos: ', { event })

  const userId = getUserId(event)
  const items = getTodosForUser(userId)

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