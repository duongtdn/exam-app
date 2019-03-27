" use strict"

require('dotenv').config()

const api = require('../src/api/main')

const Tests = [
  {
    userId: 'awesome-dev',
    testId: 'test-id',
    courseId: 'emb-01',
    type: 'final',
    duration: 30,
    createdAt: new Date(),
  }
]

const Exams = [
  {
    courseId: 'emb-01',
    type: 'final',
    sections: [
      {id: 'sc1', title: 'Section 1', description: 'Here is the section 1'},
      {id: 'sc2', title: 'Section 2', description: 'Here is the section 2'}
    ],
    questions: [
      {ref: 'qb1', number: 2, score: 10, section: 'sc1'},
      {ref: 'qb2', number: 1, score: 10, section: 'sc1'},
      {ref: 'qb3', number: 2, score: 10, section: 'sc2'},
    ]
  }
]

const Qbanks = [
  {
    qbankId: 'qb1',
    name: 'DragDrop test 1',
    topic: 'Embedded',
    questions: [
      {
        problem: '{"props":{"className":"w3-container w3-padding","width":"700px","height":"450px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-red","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-blue","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-green","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
        answer: ''
      },
      {
        problem: '{"props":{"className":"w3-container w3-padding","width":"700px","height":"450px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-deep-orange","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-pink","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-indigo","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
        answer: ''
      },
    ]
  }
]

api.helpers({
  Collections: {
    Tests: {
      find({userId, testId, done}) {
        setTimeout(() => {
          done && done(Tests.filter( _test => _test.userId === userId && _test.testId === testId))
        }, 500)
        return this
      } 
    },
    Exams: {
      find({courseId, type}, done) {
        setTimeout(() => {
          done && done(Exams.filter( _exam => _exam.courseId === courseId && _exam.type === type))
        }, 500)
        return this
      }
    },
    QBANKS: {
      find(qbankId) {

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