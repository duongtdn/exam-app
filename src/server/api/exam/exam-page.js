"use trict"

const { html } = require('../../lib/html')

function reponse() {
  return function(req, res) {
    const testId = req.query.t
    if (testId) {
      res.writeHead( 200, { "Content-Type": "text/html" } )
      res.end(html({
        title: 'Error',
        script: `${process.env.CDN}/exam.js`,
        data: {
          urlBasePath: process.env.URL_BASE_PATH,
          urlQuizzesBasePath: process.env.URL_QUIZZES_BASE_PATH
        }
      }))
    } else {
      res.status(400).send('Bad Request')
    }
  }
}

module.exports = reponse
