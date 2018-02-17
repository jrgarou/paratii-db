'use strict'

const Models = require('../models')
const parser = require('../parser')
const User = Models.user

module.exports = function (paratii) {
  var module = {}
  // paratiiInstance = paratii

  module.init = async function () {
    // events hook

    await paratii.eth.events.addListener('CreateUser', function (log) {
      console.log('creating user ', log.returnValues._address)

      User.upsert(parser.user(log), (err, user) => {
        if (err) {
          throw err
        }
      })
    })
    await paratii.eth.events.addListener('RemoveUser', function (log) {
      console.log('removing user ', log.returnValues._address)
      User.delete(log.returnValues._address, (err, res) => {
        if (err) {
          throw err
        }
      })
    })

    console.log('inizialized all user events')
  }

  return module
}
