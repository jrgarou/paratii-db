/* eslint-env mocha */
'use strict'

const chai = require('chai')
const paratiilib = require('paratii-lib')
const dirtyChai = require('dirty-chai')
const accounts = require('./data/accounts')

const assert = chai.assert
const expect = chai.expect
chai.use(dirtyChai)
const Video = require('../src/models').video

const fixtures = require('./data/fixtures')

describe('# Paratii-db Video Model Spec', function (done) {
  let paratii

  before(async () => {
    await Video.remove({})
    paratii = await new paratiilib.Paratii({
      provider: 'http://localhost:8545/rpc/',
      address: accounts[0].publicKey,
      privateKey: accounts[0].privateKey
    })
    const contract = await paratii.eth.deployContracts()
    const server = require('../src/server')
    setTimeout(() => {
      server.start(contract.Registry.options.address)
      done()
    }, 1000)
  })

  it('should be able to insert 1 video and get it back.', (done) => {
    console.log('run 4')
    Video.upsert(fixtures[0], (err, vid) => {
      if (err) return done(err)
      assert.isOk(vid)
      done()
    })
  })

  it('should be able to insert multiple videos.', (done) => {
    Video.bulkUpsert(fixtures, (err, success) => {
      if (err) return done(err)
      assert.isOk(success)
      done()
    })
  })

  it('get a sample of 6 videos', (done) => {
    Video.getRelated('QmNhyQjsFW2Tvuz7CFwDTBPo3dfBQ3S4StEpfUZPSpK9FY', (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(6)
      done()
    })
  })

  it('search videos by owner and get results back', (done) => {
    Video.search({keyword: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(3)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by "tagtarget" and get results back', (done) => {
    Video.search({keyword: 'tagtarget'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(1)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by "titletarget" and get results back', (done) => {
    Video.search({keyword: 'titletarget'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(1)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by "descriptiontarget" and get results back', (done) => {
    Video.search({keyword: 'descriptiontarget'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(2)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by uploader address and get results back', (done) => {
    Video.search({keyword: '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(1)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by uploader name and get results back', (done) => {
    Video.search({keyword: 'uploadernametarget'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(2)
      // console.log('found related videos', result)
      done()
    })
  })
  it('search videos by owner address and a title and get results back', (done) => {
    Video.search({keyword: 'uploadernametarget', owner: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4'}, (err, result) => {
      if (err) return done(err)
      assert.isOk(result)
      expect(result).to.have.lengthOf(1)
      // console.log('found related videos', result)
      done()
    })
  })
})
