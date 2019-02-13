"use strict"


const Builder = require('express-api-builder')

const api = Builder()

api.add('/exam', {
  get: require('./exam/exam-page')
})

api.add('/exam/session', {
  post: require('./exam/new-session')
})

module.exports = api