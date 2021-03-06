'use strict'
const express = require('express')
const router = express.Router()
const Models = require('../../models')
const Video = Models.video

router.get('/:id/related', (req, res, next) => {
  // get related videoss
  // res.json({status: 'not yet implemented'})
  Video.getRelated(req.params.id, (err, videos) => {
    if (err) {
      return res.send(err)
    }

    return res.json(videos)
  })
})

/**
 * get video by _id
 * @param {String}  id  video _id
 */

router.get('/:id', (req, res, next) => {
  Video.findOne({_id: req.params.id}, (err, video) => {
    if (err) return res.send(err)
    res.json(video)
  })
})

/**
 * Get all video or seach
 */

router.get('/', (req, res, next) => {
  Video.search(req.query, (err, result) => {
    if (err) {
      return res.send(err).statusCode(500)
    }
    // TODO: add query params, total, start, limit and results
    return res.json(result)
  })
})

module.exports = router
