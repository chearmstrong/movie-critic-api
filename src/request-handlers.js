/* eslint-disable fp/no-nil, fp/no-unused-expression */

/**
 * External dependencies.
 */
const R = require('ramda')

/**
 * Internal dependencies.
 */
const getYoutubeDirectUrl = require('./core/get-youtube-direct-url')

const getYoutubeDirectUrlForMany = async ids => {
  const youTubeIds = ids.split(',')
  const uniqueIds = [...new Set(youTubeIds)]
  const promises = uniqueIds.map(id =>
    getYoutubeDirectUrl(id)
      .then(res => ({ [id]: res.url }))
      .catch(error => {
        console.log(`Error fetching for ID ${id}`)

        return { [id]: null, error }
      })
  )
  const response = await Promise.all(promises)
  const returnPayload = R.o(R.reduce(R.mergeRight, {}), R.reject(R.has('error')))(response)

  return returnPayload
}

/**
 * For a collection of "things" - for example, ALL videos.
 * None currently supported.
 */
const collectionHandlers = {
  GET: getYoutubeDirectUrlForMany
}

/**
 * For a singular "thing" - for example, ONE video.
 * Only `GET` currently supported.
 */
const itemHandlers = {
  GET: getYoutubeDirectUrl
}

module.exports = {
  itemHandlers,
  collectionHandlers
}
