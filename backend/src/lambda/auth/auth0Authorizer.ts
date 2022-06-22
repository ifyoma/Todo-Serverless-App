import { APIGatewayAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

// import Axios from 'axios'

const logger = createLogger('auth')
const auth0Secret = 'cFjrmHHOL9PXLfbYLKm2_eO2NDW8cb8KZPySrELdRW-XYg0wPLX2rQ_UCGhU7qRB'

// // TODO: Provide a URL that can be used to download a certificate that can be used
// // to verify JWT token signature.
// // To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
// const jwksUrl = '...'

export const handler = async (event: APIGatewayAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.type)

  try {
    const jwtToken = await verifyToken(event)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(event: APIGatewayAuthorizerEvent): Promise<JwtPayload> {
  const token = getToken(event)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  console.log(jwt);

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, auth0Secret) as JwtPayload
}


function getToken(event: APIGatewayAuthorizerEvent): string {
  if (!event.type || event.type !== 'TOKEN')
    throw new Error('Expected "event.type" parameter to have value "TOKEN"');

  const authHeader = event.authorizationToken;
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}