/**
 * External dependencies.
 */
const R = require('ramda')

/**
 * Internal dependencies.
 */
const { collectionHandlers, itemHandlers } = require('../request-handlers')

const getHandlers = R.ifElse(
  R.propSatisfies(R.isNil, 'pathParameters'),
  R.always(collectionHandlers),
  R.always(itemHandlers)
)

module.exports = getHandlers
