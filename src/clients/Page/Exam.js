"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'

const QUIZZESKEY = '__$quizzes__'

export default class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: undefined,
      type: undefined,
      error: null,
      loading: true,
      timerOnOff: 'off',
      currentIndex: 0,
      pinnedQuizes: []
    }
    this._timer = null
    this.myTest = null
    const bindMethods = ['nextQuiz', 'previousQuiz', 'pinQuiz', 'unpinQuiz', 'updateAnswers', 'getSavedAnswers', 'updateInternalState', 'getSavedInternalState']
    bindMethods.forEach( method => this[method] = this[method].bind(this) )
  }

  componentDidMount() {
    const today = getToday();
    const testId = getTestIdFromHref(window.location.href)
    if (testId) {
      this.requestNewSession(testId, (err, response) => {
        if (err) {
          this.setState({ error: err, loading: false })
        } else {
          this.myTest = JSON.parse(response)
          this.loadAssets( () => {
            const course = this.myTest.courseId
            const type = this.myTest.type
            this.setState({ course, type, today, loading: false, timerOnOff: 'on' })
          })
        }
      })
    } else {
      this.setState({ error: '400 Bad Request', loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return (<div className="w3-container"> LOADING... </div>)
    }

    if (this.state.error) {
      return (<div className="w3-container"> {this.state.error} </div>)
    }

    return (
      <div>
        <Header />
        <div className="w3-container" style={{maxWidth: '1200px', margin: 'auto'}}>

          <Title  course = {this.state.course}
                  type = {this.state.type}
                  today = {this.state.today}
          />

          <div className="w3-cell-row">
            <div className="w3-cell" style={{verticalAlign: 'top'}}>
              <QuizBoard  tests = {this.myTest}
                          currentIndex = {this.state.currentIndex}
                          next = {this.nextQuiz}
                          previous = {this.previousQuiz}
                          pinQuiz = {this.pinQuiz}
                          unpinQuiz = {this.unpinQuiz}
                          pinnedQuizes = {this.state.pinnedQuizes}
                          updateAnswers = {this.updateAnswers}
                          getSavedAnswers = {this.getSavedAnswers}
                          updateInternalState = {this.updateInternalState}
                          getSavedInternalState = {this.getSavedInternalState}
              />
            </div>
            <div className="w3-cell w3-hide-small" style={{verticalAlign: 'top', padding:'8px 0 8px 16px', width: '154px'}}>
              <StatusBar  testDuration = {this.myTest.duration * 60}
                          timerOnOff = {this.state.timerOnOff}
                          pinnedQuizes = {this.state.pinnedQuizes}
                          moveToQuiz = {index => this.moveToQuiz(index)}
              />
            </div>
          </div>
          
          
        </div>          
      </div>    
    )
  }
  requestNewSession(testId, done) {
    const urlBasePath = this.props.urlBasePath || ''
    const uid = 'awesome-dev' // fake uid for dev only
    xhttp.post(`${urlBasePath}/exam/session`, {uid, testId}, (status, response) => {
      if (status === 200) {
        done(null, response)
      } else {
        done(status, null)
      }
    })
  }
  loadAssets(done) {
    const promises = []
    this.myTest.content.questions.forEach( (question) => {
      promises.push(this._loadQuestionProblem(question))
    })
    Promise.all(promises).then(done)
  }
  _loadQuestionProblem(question) {
    const urlQuizzesBasePath = this.props.urlQuizzesBasePath || ''
    return new Promise((resolve, reject) => {
      xhttp.get(`${urlQuizzesBasePath}/${question.problem}`, (status, response) => {
        if (status === 200) {
          question.problem = response
          resolve()
        } else {
          reject(status)
        }
      })
    })
  }
  moveToQuiz(index) {
    this.setState({ currentIndex: index })
  }
  nextQuiz() {
    const currentIndex = this.state.currentIndex    
    if (currentIndex < this.myTest.content.questions.length-1) {
      this.moveToQuiz(currentIndex+1)
    } else {
      console.log('Reach end of test')
    }
  }
  previousQuiz() {
    const currentIndex = this.state.currentIndex
    if (currentIndex > 0) {
      this.moveToQuiz(currentIndex-1)
    }
  }
  pinQuiz(index) {
    const pinnedQuizes = this.state.pinnedQuizes
    if (pinnedQuizes.indexOf(index) === -1) {
      pinnedQuizes.push(index)
      this.setState({ pinnedQuizes })
    }    
  }
  unpinQuiz(index) {
    const pinnedQuizes = this.state.pinnedQuizes.filter( _index => {
      return (index !== _index)
    })
    this.setState({ pinnedQuizes })
  }
  _getQuizFromStorage(index) {
    const quizzes = JSON.parse(localStorage.getItem(QUIZZESKEY))
    if (quizzes) {
      return quizzes[index] || {}
    } else {
      return {}
    }
  }
  _storeQuizToStorage(index, quiz) {
    const quizzes = JSON.parse(localStorage.getItem(QUIZZESKEY)) || {}
    quizzes[index] = quiz
    localStorage.setItem(QUIZZESKEY, JSON.stringify(quizzes))
  }
  _clearAllQuizsFromStorage() {
    localStorage.removeItem(QUIZZESKEY)
  }
  updateAnswers(answers) {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    quiz.answers = answers
    this._storeQuizToStorage(index, quiz)
  }
  getSavedAnswers() {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    return quiz.answers
  }
  updateInternalState(state) {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    quiz.state = state
    this._storeQuizToStorage(index, quiz)
  }
  getSavedInternalState() {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    return quiz.state
  }
}

function getTestIdFromHref(href) {
  const query = href.split('?')[1]
  const testId= query.split('=')[1]
  return testId
}

function getToday() {
  const weekday  = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = new Date()
  const dd = today.getDate();
  const mm = ("00" + (today.getMonth()+1)).slice(-2); //January is 0!
  const yyyy = today.getFullYear();
  return `${weekday[today.getDay()]} ${dd}-${mm}-${yyyy}`
}