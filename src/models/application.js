'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({
  _id: String,
  deposit: Number,
  blockNumber: Number
})

/**
 * Upsert parsed application events
 * @param  {Object}   tx a parsed application log
 * @param  {Function} cb      (err, result)
 * @return {Boolean}      how the upsert goes
 */
ApplicationSchema.statics.upsert = function (tx, cb) {
  if (!tx || !tx._id) {
    return cb(new Error('tx._id is required for upsert'))
  }

  this.findByIdAndUpdate(tx._id,
   {$set: tx},
   {new: true, upsert: true}, cb)
}

ApplicationSchema.statics.findLastBlockNumber = async function () {
  let result = await this.findOne({ }).sort('-blockNumber').exec()
  if (!result) {
    result = {}
    result.blockNumber = 0
  }
  return result.blockNumber
}

const Application = mongoose.model('Application', ApplicationSchema)

module.exports = Application
