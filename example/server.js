" use strict"

require('dotenv').config()

const api = require('../src/api/main')

const Tests = [
  
]

const Exams = [
  {
    examId: 'emb-01-final-exam',
    title: 'Final Test',
    description: 'This exam test your knowledge and skill after course Embedded ARM Programming for Beginner',
    sections: [
      {id: 'sc1', title: 'Section 1', description: 'Here is the section 1'},
      {id: 'sc2', title: 'Section 2', description: 'Here is the section 2'}
    ],
    questions: [
      {qbankId: 'qb1', number: 2, score: 10, section: 'sc1'},
      // {qbankId: 'qb2', number: 1, score: 10, section: 'sc1'},
      // {qbankId: 'qb3', number: 2, score: 10, section: 'sc2'},
    ],
    duration: 30
  }
]

const Qbanks = [
  {
    qbankId: 'qb1',
    topicId: 'Embedded',
    title: 'Question using DragDrop addon',
    questions: [
      {
        problem: 'dragdrop.1',
        answer: ''
      },
      {
        problem: 'dragdrop.2',
        answer: ''
      },
    ]
  }
]

api.helpers({
  Collections: {
    Tests: {
      find({userId, testId}, done) {
        setTimeout(() => {
          done && done(Tests.filter( _test => _test.userId === userId && _test.testId === testId))
        }, 500)
        return this
      },
      update({ testId, ...props }, done) {
        setTimeout(() => {
          let updated = false
          Tests.forEach(test => {
            if (test.testId === testId) {
              for (let key in props) {
                test[key] = props[key]
              }
              updated = true
            }
          })
          if (!updated) {
            Tests.push({ testId, ...props })
          }
          done && done(null, props)
        }, 500)
        return this
      }
    },
    Exams: {
      find({ examId }, done) {
        setTimeout(() => {
          done && done(Exams.filter( _exam => _exam.examId === examId))
        }, 500)
        return this
      }
    },
    Qbanks: {
      find({qbankIds}, done) {
        setTimeout(() => {
          done && done(Qbanks.filter( _qt => qbankIds.indexOf(_qt.qbankId) !== -1 ))
        }, 500)
        return this
      }
    }
  }
})

const express = require('express')
const app = express()

const path = require('path')
app.use('/assets', express.static(path.join(__dirname, '../build')))

app.use('/', api.generate())

const PORT = 3400
app.listen(PORT, (err) => {
  if (err) {
    console.log('Failed to start API Server')
  } else {
    console.log(`EXAM: API Server is running at port ${PORT}`)
  }
})