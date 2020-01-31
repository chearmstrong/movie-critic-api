/* eslint-disable fp/no-nil, fp/no-unused-expression */

/**
 * Only do this is X-Ray treacing is enabled.
 */
if (process.env.XRAY_TRACING === 'true') {
  const AWSXRay = require('aws-xray-sdk-core')

  AWSXRay.captureHTTPsGlobal(require('https'))
  // AWSXRay.capturePromise()
}

/**
 * External dependencies.
 */
const R = require('ramda')

/**
 * Internal dependencies.
 */
const getHandlers = require('./lib/get-handlers')

const getPayload = R.either(R.path(['pathParameters', 'id']), R.path(['queryStringParameters', 'ids']))

const getReturnPayload = R.applySpec({
  isBase64Encoded: R.F,
  statusCode: R.prop('statusCode'),
  body: R.o(JSON.stringify, R.propOr({}, 'body')),
  headers: R.always({ 'Access-Control-Allow-Origin': '*' })
})

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

    return getReturnPayload({ statusCode: 204 })
  }

  try {
    const handlers = getHandlers(event)
    const httpMethod = R.prop('httpMethod', event)
    const handler = R.prop(httpMethod, handlers)

    if (handler) {
      const payload = getPayload(event)
      const responseBody = await handler(payload)

      return getReturnPayload({ statusCode: 200, body: responseBody })
    }

    return getReturnPayload({ statusCode: 405, body: { message: `Invalid HTTP Method: ${httpMethod}` } })
  } catch (error) {
    const message = error.message || 'Houston, we have a problem!'

    console.log(`Error: ${message}`)
    console.log({ error })

    return getReturnPayload({ statusCode: 400, body: { error: message } })
  }
}
