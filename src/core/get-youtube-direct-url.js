/**
 * External dependencies.
 */
const R = require('ramda')
const ytdl = require('ytdl-core')

/**
 * Internal dependencies.
 */
const { YOUTUBE_BASE_URL } = require('../constants')
const getBestDirectUrl = require('../lib/get-best-direct-url')

const getYoutubeDirectUrl = async ({ videoId }) => {
  const youTubeUrl = R.concat(YOUTUBE_BASE_URL, videoId)

    if (ytdl.validateURL(youTubeUrl)) {
      console.log(`Getting video from URL: ${youTubeUrl}`)

      const ytResponse = await ytdl.getInfo(youTubeUrl, { quality: 'highest' })
      const filtered = ytdl.filterFormats(ytResponse.formats, 'audioandvideo')

      return { url: getBestDirectUrl(filtered) }
    }

    return Promise.reject(`Invalid video URL: ${youTubeUrl}`)
}

module.exports = getYoutubeDirectUrl
