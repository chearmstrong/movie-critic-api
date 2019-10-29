/**
 * Internal dependencies.
 */
const getYoutubeDirectUrl = require('./core/get-youtube-direct-url')

/**
 * For a collection of "things" - for example, ALL videos.
 * None currently supported.
 */
const collectionHandlers = {}

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
