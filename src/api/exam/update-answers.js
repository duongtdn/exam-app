"use strict"

const jwt = require('jsonwebtoken')

function authen() {
  return function(req, res, next) {
    console.log('authen: hit')
    // jwt.verify(req.body.uid, process.env.PRIVATE_AUTH_KEY, (err, decoded) => {
    //   if (err) {
    //     res.status(401).json({ explaination: 'Unauthorized' })
    //   } else {
    //     req.uid = decoded.uid
    //     next()
    //   }
    // })
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
      next()
    }
  }
}

function updateAnswers(helpers) {
  return function(req, res, next) {
    helpers.Collections.Tests.updateUserAnswers({
      testId: req.testId,
      questions: req.body.questions
    }, (err) => {
      if (err) {
        res.status(500).json({ explaination: 'Access DB failed'})
      } else {
        res.status(200).json({ message: 'ok' })
      }
    })
  }
}

module.exports = [authen, decodeSession, updateAnswers]
