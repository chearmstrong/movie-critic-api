/**
 * External dependencies.
 */
const R = require('ramda')

// TODO: Limit at 720x480
const getBestResult = R.compose(
  R.prop('url'),
  R.head,
  R.sort(R.descend(R.prop('resolution')))
)

module.exports = getBestResult
