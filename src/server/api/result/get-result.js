"use strict"

"use trict"

const { html } = require('../../lib/html')

function authen() {
  return function(req, res, next) {
    // TBD
    // authenticate user via cookie, if false redirect to login page or simply display info page required login from external app
    req.uid = 'awesome-dev'
    next()
  }
}

function validateParams() {
  return function(req, res, next) {
    if (!req.query.r) {
      res.status(400).json({ explaination: 'invalid query parameter r'})
      return
    } else {
      next()
    }
  }
}

function getResultData(helpers) {
  return function(req, res, next) {
    const resultId = req.query.r
    helpers.Collections.Tests.find({ resultId }, ["resultId", "title", "description", "startAt", "assignedTo", "result", "content.sections"], (data) => {
      if (data && data.length > 0) {
        if (data[0].assignedTo.indexOf(req.uid) === -1) {
          res.status(403).json({ explaination: 'forbidden'})
        } else {
          req.data = data[0]
          next()
        }
      } else {
        res.status(404).json({ explaination: 'not found'})
      }
    })
  }
}

function response() {
  return function(req, res) {
    res.writeHead( 200, { "Content-Type": "text/html" } )
    res.end(html({
      title: 'Test Result',
      script: `${process.env.CDN}/result.js`,
      data: {
        urlBasePath: process.env.URL_BASE_PATH,
        data: req.data
      }
    }))
  }
}

module.exports = [authen, validateParams, getResultData, response]
