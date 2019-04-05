"use strict"

const jwt = require('jsonwebtoken')

function authen() {
  // return function(req, res, next) {
  //   jwt.verify(req.body.uid, process.env.SHARE_AUTH_KEY, (err, decoded) => {
  //     if (err) {
  //       res.status(401).json({ explaination: 'Unauthorized' })
  //     } else {
  //       req.uid = decoded.uid
  //       req.examId = decoded.examId
  //       next()
  //     }
  //   })
  // }
  req.uid = 'awesome-dev'
}

function getExamStructure(helpers) {
  return function(req, res, next) {
    const examId = req.examId
    if (examId) {
      helpers.Collections.Exams.find({ examId }, exams => {
        if (exams.length > 0) {
          req.exam = exams[0]
        } else {
          res.status(404).json({ explaination: 'Exam not found'})
        }
      })
    } else {
      res.status(400).json({ explaination: 'Missing exam id'})
    }
  }
}

function getQuizes(helpers) {
  return function(req, res, next) {
    const qbankIds = req.exam.questions.map(question => {
      return questions.qbankId
    })
    helpers.Collections.Qbanks.find({ qbankIds }, quizes => {
      if (quizes.length > 0) {
        req.quizes = quizes
        next()
      } else {
        res.status(404).json({ explaination: 'No quiz found. Access to QBANKS may be failed'})
      }
    })
  }
}

function generateQuestions() {
  return function(req, res, next) {
    const questions = []
    req.exam.questions.forEach(question => {
      const quiz = req.quizes.filter( _quiz => _quiz.qbankId === question.qbankId)
      _urand(quiz.questions.length, question.number).forEach( num => {
        questions.push({
          section: question.section,
          score: question.score,
          ...quiz.questions[num]
        })
      })
    })
    return questions
  }
} 

function generateTest(helpers) {
  return function(req, res, next) {
    const test = {
      testId: 'test-id', // TBD: create random testId
      assignedTo: [req.uid],
      examId: req.examId,
      createAt: new Data(),
      duration: req.exam.duration,
      content: {
        sections: req.exam.sections,
        questions: req.questions
      }
    }
    helpers.Collections.Tests.update(test, (err) => {
      if (err) {
        res.status(500).json({ explaination: 'Write to DB failed'})
      } else {
        next()
      }
    })
  }
}

function _urand(length, count) {
  const barray = Array.from(new Array(length), (x,i) => i)
  const rlist = []
  for (let i = 0; i < count; i++) {
    rlist.push(barray.splice(_rand(barray.length), 1))
  }
  return rlist
}

function _rand(length) {
  return Math.floor(Math.random() * length)
}

module.exports = [authen, getExamStructure, getQuizes, generateQuestions, generateTest]