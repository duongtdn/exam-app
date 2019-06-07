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

function validateAttachedSession() {
  return function(req, res, next) {
    if (req.body.session) {
      _validateSession({
        session: req.body.session,
        onSuccess: next,
        onFailure: err=> res.status(403).json({ explaination: 'Session is invalid or expired'})
      })
    } else {
      next()
    }
  }
}

function getTestData(helpers) {
  return function(req, res, next) {
    if (!req.body.testId) {
      res.status(400).json({ explaination: 'MIssing testId' })
      return
    }
    jwt.verify(req.body.testId, process.env.PRIVATE_TEST_KEY, (err, decoded) => {
      if (err) {
        res.status(403).json({ explaination: 'Forbidden - Invalid testId or Test has been expired'})
      } else {
        req.testId = decoded.testId
        helpers.Collections.Tests.find({ testId: req.testId }, (testData) => {
          if (testData.length > 0) {
            req.testData = testData[0]
            if (req.testData.assignedTo.indexOf(req.uid) === -1) {
              res.status(403).json({ explaination:'Forbidden' })
              return
            }
            if (req.testData.completedAt && req.testData.completedAt[req.uid]) {
              res.status(404).json({ explaination: 'Test has been finished'})
              return
            }
            next()
          } else {
            res.status(404).json({ explaination:'Test not found' })
          }
        })
      }
    })
  }
}

function validateStoredSession() {
  return function(req, res, next) {
    if (req.testData.session) {
      if (req.body.session && req.body.session === req.testData.session) {
        next()
      } else {
        res.status(403).json({ explaination: 'Session mismatch'})
      }
    } else {
      next()
    }
  }
}

function signSessionToken(helpers) {
  return function(req, res, next) {
    if (req.testData.session) {
      next()
    } else {
      const testId = req.testId
      const token = jwt.sign({ testId }, process.env.PRIVATE_SESSION_KEY, {expiresIn: `${req.testData.duration}m`})
      req.testData.session = token
      req.testData.startAt = (() => new Date())().getTime()
      helpers.Collections.Tests.update({ testId, session: token, startAt: req.testData.startAt}, (err) => {
        if (err) {
          res.status(500).json({ explaination: 'Failed to create session' })
        } else {
          next()
        }
      })
    }
  }
}

function response() {
  return function (req, res) {
    const data = {
      title: req.testData.title,
      description: req.testData.description,
      content: req.testData.content,
      session: req.testData.session,
      duration: req.testData.duration,
      startAt: req.testData.startAt,
      resultId: req.testData.resultId
    }
    res.status(201).json(data)
  }
}

function _validateSession({session, onSuccess, onFailure}) {
  jwt.verify(session, process.env.PRIVATE_SESSION_KEY, (err, decoded) => {
    if (err) {
      onFailure && onFailure({ explaination: 'Forbidden - Session expired'})
    } else {
      onSuccess && onSuccess()
    }
  })
}

module.exports = [authen, validateAttachedSession, getTestData, validateStoredSession, signSessionToken, response]
