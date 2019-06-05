"use strict"

const jwt = require('jsonwebtoken')

const { is } = require('../../lib/util')

function authen() {
  return function(req, res, next) {
    // jwt.verify(req.body.uid, process.env.PRIVATE_AUTH_KEY, (err, decoded) => {
    //   if (err) {
    //     res.status(401).json({ explaination: 'Unauthorized' })
    //   } else {
    //     req.uid = decoded.uid
    //     next()
    //   }
    // })
    req.uid = 'awesome-dev'
    next()
  }
}

function decodeSession() {
  return function(req, res, next) {
    if (req.body.session) {
      jwt.verify(req.body.session, process.env.PRIVATE_SESSION_KEY, (err, decoded) => {
        if (err) {
          res.status(403).json({ explaination: 'Forbidden - Session expired'})
        } else {
          req.testId = decoded.testId
          next()
        }
      })
    } else {
      res.status(403).json({explaination: 'Forbidden - Missing session'})
    }
  }
}

function createResult(helpers) {
  return function(req, res, next) {
    helpers.Collections.Tests.find({ testId: req.testId }, { content, passScore, resolveMethod }, data => {
      if (data.length === 0) {
        res.status(404).json({ error: 'Test not found'})
        return
      }
      const test = data[0]
      const results = {}
      results[req.uid] = {}
      const result = results[req.uid]

    })
  }
}

function updateToDatabase(helpers) {
  return function(req, res) {
    if (req.body.finish) {
      const completedAt = {}
      completedAt[req.uid] = new Date()
      helpers.Collections.Tests.update({testId: req.testId, completedAt}, err => {
        if (err) {
          res.status(500).json({ error: 'Access Database failed'})
        } else {
          res.status(200).json({ status: 'closed session'})
        }
      })
    } else {
      res.status(200).json({ status: 'not update'})
    }
  }
}

/* rule for correctAnswer
     1- Each answer item can be an object or a pattern(string). Array should be convert to Object {'0': 'xxx', '1': 'yyy'}
     2- For answer item that is an object, it should not nested any other object or array,
        each item of the oblect only accept pattern(string)
     3- Number is represent by a string, for example: ^250$
     4- Boolean is represent by a string, for example: ^true$
 */
function _matchAnswer({correctAnswer, userAnswer}) {
  for (let key in correctAnswer) {
    console.log(`\nMatching item: ${key}`)
    if (!_match(correctAnswer[key], userAnswer[key])) {
      return false
    }
  }
  return true
}

function _match(ref, item) {
  if (is('Object')(ref)) {
    for (let key in ref) {
      console.log(`  Matching key: ${key}`)
      const re = new RegExp(ref[key])
      const matched = item[key] !== undefined && re.test(item[key])
      console.log(`         ref[${key}]  = ${ref[key]}`)
      console.log(`         item[${key}] = ${item[key]}`)
      console.log(`         matched : ${matched}`)
      if (!matched) { return false }
    }
    return true
  } else {
    const re = new RegExp(ref)
    const matched = item !== undefined && re.test(item)
    console.log(`         ref  = ${ref}`)
    console.log(`         item = ${item}`)
    console.log(`         matched : ${matched}`)
    return matched
  }
}

module.exports = [authen, decodeSession, updateToDatabase]
