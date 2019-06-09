"use strict"

const Tests = [
  {
    testId: 'test-01',
    resultId: 'r-test-01',
    assignedTo: 'awesome-dev',
    examId: 'emb-01-final-exam',
    title: 'Embedded - 01: Final Exam',
    description: 'Final Test for course Embedded - 01',
    createAt: (() => new Date())().getTime(),
    duration: 30,
    // session: 'session',
    content: {
      sections: [
        {id: 'sc1', title: 'Section 1', description: 'Here is the section 1'},
        {id: 'sc2', title: 'Section 2', description: 'Here is the section 2'}
      ],
      questions: [
        {
          problem: 'dragdrop.1', correctAnswers: {'$1': {top: '^310$', left: '^20$'}, '$2': {top: '^160$', left: '^30$'}, '$3': {top: '^70$', left: '^510$'}}, score: 10, section: 'sc1'
        },
        {
          problem: 'choices.1', correctAnswers: {'$1': '^false$', '$2': '^true$', '$3': '^false$'}, score: 10, section: 'sc1'
        },
        {
          problem: 'dragdrop.2', correctAnswers: {'$1': {top: '^310$', left: '^20$'}, '$2': {top: '^160$', left: '^30$'}, '$3': {top: '^70$', left: '^510$'}}, score: 10, section: 'sc1'
        },
      ]
    },
    passScore: 20,
    startAt: 1559894402883,
    result: {
      "status":"passed",
      "createdAt":1559894402883,
      "detail":{
        "totalScore":20,
        "sectionScores":[
          {"id":"sc1","score":20, "points":30},
          {"id":"sc2","score":0, "points":30}
        ]
      }
    }
  }
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

module.exports = {
    Tests: {
      find({ testId, resultId }, projection, done) {
        if ({}.toString.call(projection) === '[object Function]') {
          done= projection
        }
        setTimeout(() => {
          const data = Tests.filter( _test => _test.testId === testId || _test.resultId === resultId )
          let test = {}
          if (data.length > 0) {
            if ({}.toString.call(projection) === '[object Array]') {
              projection.forEach( prop => {
                const p = prop.split(".")
                if (p.length === 1) {
                  const k = p[0]
                  test[k] = data[0][k]
                } else {
                  const k = p[0]
                  const l = p[1]
                  if (!test[k]) { test[k] = {} }
                  test[k][l] = data[0][k][l]
                }
              })
            } else {
              test = {...data[0]}
            }
          }
          done && done([test])
        }, 500)
        return this
      },
      update({ testId, ...props }, done) {
        setTimeout(() => {
          let updated = false
          Tests.forEach(test => {
            if (test.testId === testId) {
              for (let key in props) {
                if (typeof props[key] === 'object' && !!props[key]) {
                  // nested object
                  test[key] = {...test[key], ...props[key]}
                } else {
                  test[key] = props[key]
                }
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
      },
      updateUserAnswers({ testId, questions }, done) {
        setTimeout(() => {
          Tests.forEach(test => {
            if (test.testId === testId) {
              questions.forEach( q => {
                const question = test.content.questions[q.index]
                question.userAnswers = q.userAnswers
              })
            }
          })
          done && done(null)
        },500)
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

