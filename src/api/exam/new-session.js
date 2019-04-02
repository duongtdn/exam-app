"use strict"

const jwt = require('jsonwebtoken')

function authen() {
  return function(req, res, next) {
    jwt.verify(req.body.uid, process.env.PRIVATE_AUTH_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ explaination: 'Unauthorized' })
      } else {
        req.uid = decoded.uid
        next()
      }
    })
  }
}

function getTestData(helpers) {
  return function(req, res, next) {
    jwt.verify(req.body.testId, process.env.PRIVATE_TEST_KEY, (err, decoded) => {
      if (err) {
        res.status(403).json({ explaination: 'Forbidden - Test expired'})
      } else {
        req.testId = decoded.testId
        helpers.Collections.Tests.find({ testId: req.testId }, (testData) => {
          if (testData.length > 0) {
            req.testData = testData[0]
            if (req.testData.assignedTo.indexOf(req.uid) === -1) {
              res.status(401).json({ explaination:'Unauthorized' })
            } else {
              next()
            }
          } else {
            res.status(404).json({ explaination:'Test not found' })
          }
        })
      }
    })
  }
}

function validateSession() {
  return function(req, res, next) {
    if (req.testData.session) {
      jwt.verify(req.testData.session, process.env.PRIVATE_SESSION_KEY, (err, decoded) => {
        if (err) {
          res.status(403).json({ explaination: 'Forbidden - Session expired'})
        } else {
          next()
        }
      })
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
      const token = jwt.sign({ testId }, process.env.PRIVATE_SESSION_KEY)
      req.testData.session = token
      helpers.Collections.Tests.update({ testId, session: token, takenAt: new Date() }, (err) => {
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
      content: req.testData.content,
      session: req.testData.session,
      duration: req.testData.duration
    }
    res.status(200).json(data)
  }
}

module.exports = [authen, getTestData, signSessionToken, response]