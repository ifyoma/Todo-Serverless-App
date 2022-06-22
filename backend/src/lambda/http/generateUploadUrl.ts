import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
// import { getUserId } from '../utils'

// const todosTable = process.env.TODOS_TABLE
// const bucketName = process.env.ATTACHMENT_S3_BUCKET
// const urlExpiration = process.env.SIGNED_URL_EXPIRATION

// const s3 = new AWS.S3({
//   signatureVersion: 'v4'
// })

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // const todoId = event.pathParameters.todoId
    // const userId = getUserId(event)

    console.log("Processing event: ", event);

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id


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
