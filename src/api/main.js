"use strict"


const Builder = require('express-api-builder')

const api = Builder()

api.add('/exam', {
  get: require('./exam/exam-page')
})

api.add('/exam/session', {
  post: require('./exam/new-session')
})

api.add('/register/exam', {
  post: require('./exam/register-new-test')
})

api.add ('/exam/solution', {
  put: require('./exam/update-answers')
})

module.exports = api
