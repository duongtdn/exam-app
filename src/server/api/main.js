"use strict"

const Builder = require('express-api-builder')

const api = Builder()

api.add('/exam', {
  get: require('./exam/exam-page')
})

api.add('/exam/session', {
  post: require('./exam/new-session'),
  put: require('./exam/end-session')
})

api.add('/register/exam', {
  post: require('./exam/register-new-test')
})

api.add ('/exam/solution', {
  put: require('./exam/update-answers')
})

api.add ('/result', {
  get: require('./result/get-result.js')
})

api.add ('/test', {
  get: function(helpers) {
    return function(req, res) {
      helpers.Collections.Tests.find({ testId: 'test-01'}, data => {
        console.log(data[0])
        res.status(200).json({data: data[0]})
      })
    }
  }
})

module.exports = api
