"use strict"

const jwt = require('jsonwebtoken')

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
      next()
    }
  }
}

function updateSession(helpers) {
  return function(req, res,) {
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

module.exports = [authen, decodeSession, updateSession]
