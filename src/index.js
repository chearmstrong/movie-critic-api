/**
 * External dependencies.
 */
const R = require('ramda')

/**
 * Internal dependencies.
 */
const getHandlers = require('./lib/get-handlers')

const getPayload = R.either(
  R.path(['pathParameters', 'id']),
  R.path(['queryStringParameters', 'ids'])
)

module.exports.handler = async event => {
  const warmUpRequest = R.propEq('source', 'serverless-plugin-warmup', event)

  /**
   * This uses the `serverless-plugin-warmup` plugin and sends a
   * request to the Lambda every 5 minutes, to keep it warm.
   *
   * We return early, before hitting other logic to minimise run time.
   */
  if (warmUpRequest) {
    console.log('Warming up the Lambda')

    return { statusCode: 204 }
  }

  try {
    const handlers = getHandlers(event)
    const httpMethod = R.prop('httpMethod', event)
    const handler = R.prop(httpMethod, handlers)

    if (handler) {
      const payload = getPayload(event)

      console.log('___payload', payload)

      const responseBody = await handler(payload)

      return { statusCode: 200, body: JSON.stringify(responseBody) }
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Invalid HTTP Method: ${httpMethod}` })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || 'Houston, we have a problem!' })
    }
  }
}