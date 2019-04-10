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
    req.uid = 'awesome-dev'
    next()
  }
}

function decodeSession() {
  return function(req, res, next) {
    console.log('decodeSession: hit')
    if (req.body.session) {
      console.log('   ... request attached a session. verifying ->')
      jwt.verify(session, process.env.PRIVATE_SESSION_KEY, (err, decoded) => {
        if (err) {
          res.status(403).json({ explaination: 'Forbidden - Session expired'})
        } else {
          req.testId = decoded.testId
          next()
        }
      })
    } else {
      console.log('   ... missing session session.')
      res.status(403).json({explaination: 'Forbidden - Missing session'})
      next()
    }
  }
}

function updateAnswers(helpers) {
  return function(req, res, next) {
    console.log('updated')
    res.status(200).json({ message: 'ok' })
  }
}

module.exports = [authen, decodeSession]
