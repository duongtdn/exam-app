"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'
import EndPopup from './EndPopup'
import Loading from './Loading'
import ResultPage from './ResultPage'
import Toast from './Toast'
import ErrorPage from './ErrorPage'

const QUIZZESKEY = '__$quizzes__'
const PINNEDKEY = '__$pinned__'
const SUBMITTEDKEY = '__$submitted__'
const SESSIONKEY = '__$sss__'

export default class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: undefined,
      type: undefined,
      error: null,
      loading: true,
      loadContext: 'Tests',
      timerOnOff: 'off',
      currentIndex: 0,
      pinnedQuizzes: [],
      submittedQuizzes: [],
      showEndPopup: false,
      timeout: false,
      finish: false,
      toast: ''
    }
    this._timer = null
    this.myTest = null
    this.startAt = 0
    const bindMethods = [
      'nextQuiz', 'previousQuiz', 'pinQuiz', 'unpinQuiz',
      'updateAnswers', 'getSavedAnswers', 'updateInternalState', 'getSavedInternalState', 'submitAnswers',
      'timeout', 'finishTest', '_clearLocalStorage'
    ]
    bindMethods.forEach( method => this[method] = this[method].bind(this) )
  }

  componentDidMount() {
    const today = getToday();
    const testId = getTestIdFromHref(window.location.href)
    if (testId) {
      this.requestNewSession(testId, (err, response) => {
        if (err) {
          if (err === 403) {
            this._clearLocalStorage()
            this.setState({ error: {code: err, title: 'Invalid Test Session', message: 'Invalid Test or this Test has been expired'}, loading: false })
          } else {
            this.setState({ error: {code: err, title: err, message: 'Error found when requesting new Test session'}, loading: false })
          }
        } else {
          this.setState({ loadContext: 'Assets' })
          this.myTest = JSON.parse(response)
          console.log(this.myTest)
          this._storeSession(this.myTest.session)
          this.loadAssets( () => {
            const course = this.myTest.courseId
            const type = this.myTest.type
            const pinnedQuizzes = this._getPinnedFromStorage()
            const submittedQuizzes = this._getSubmittedFromStorage()
            this.setState({ course, type, today, loading: false, timerOnOff: 'on', pinnedQuizzes, submittedQuizzes })
          })
          this.startAt = this._elapsedTimeBefore()
        }
      })
    } else {
      this.setState({ error: {code: 400, title: '400 Bad Request', message: 'Invalid Test session'}, loading: false })
    }
  }

  _elapsedTimeBefore() {
    const now = new Date()
    const startAt = new Date(this.myTest.startAt)
    const diff = (now.getTime() - startAt.getTime())/1000
    return parseInt(diff)
  }

  render() {
    if (this.state.loading) {
      return (<Loading loadContext = {this.state.loadContext} />)
    }

    if (this.state.error) {
      return (<ErrorPage error = {this.state.error} />)
    }
    if (this.state.finish) {
      return (<ResultPage />)
    }
    return (
      <div>
        <EndPopup show = {this.state.showEndPopup}
                  close = {evt => this.setState({ showEndPopup: false })}
                  submittedQuizzes = {this.state.submittedQuizzes}
                  totalQuizzes = {this.myTest.content.questions.length}
                  timeout = {this.state.timeout}
                  finish = {this.finishTest}
        />
        <Toast  show = { this.state.toast.length > 0 }
                toast = {this.state.toast}
                close = { () => this.setState({ toast: '' }) }
        />
        <Header endgame = {evt => this.setState({ showEndPopup: true })}
        />
        <div className="w3-container" style={{maxWidth: '1200px', margin: 'auto'}}>

          <Title  title = {this.myTest.title}
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
                          pinnedQuizzes = {this.state.pinnedQuizzes}
                          submittedQuizzes = {this.state.submittedQuizzes}
                          updateAnswers = {this.updateAnswers}
                          getSavedAnswers = {this.getSavedAnswers}
                          updateInternalState = {this.updateInternalState}
                          getSavedInternalState = {this.getSavedInternalState}
                          submitAnswers = {this.submitAnswers}
              />
            </div>
            <div className="w3-cell w3-hide-small" style={{verticalAlign: 'top', padding:'8px 0 8px 16px', width: '154px'}}>
              <StatusBar  testDuration = {this.myTest.duration * 60}
                          startAt = {this.startAt}
                          timerOnOff = {this.state.timerOnOff}
                          pinnedQuizzes = {this.state.pinnedQuizzes}
                          moveToQuiz = {index => this.moveToQuiz(index)}
                          submittedQuizzes = {this.state.submittedQuizzes}
                          totalQuizzes = {this.myTest.content.questions.length}
                          onTimeout = {this.timeout}
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
    const session = this._getSession()
    xhttp.post(`${urlBasePath}/exam/session`, {uid, testId, session}, (status, response) => {
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
    const pinnedQuizzes = this.state.pinnedQuizzes
    if (pinnedQuizzes.indexOf(index) === -1) {
      pinnedQuizzes.push(index)
      this.setState({ pinnedQuizzes })
      this._storePinnedToStorage(pinnedQuizzes)
    }    
  }
  unpinQuiz(index) {
    const pinnedQuizzes = this.state.pinnedQuizzes.filter( _index => {
      return (index !== _index)
    })
    this.setState({ pinnedQuizzes })
    this._storePinnedToStorage(pinnedQuizzes)
  }
  _getPinnedFromStorage() {
    const pinned = localStorage.getItem(PINNEDKEY)
    if (pinned && pinned.length > 0) {
      return JSON.parse(pinned)
    } else {
      return []
    }
  }
  _storePinnedToStorage(pinned) {
    localStorage.setItem(PINNEDKEY, JSON.stringify(pinned))
  }
  _clearAllPinnedFromStorage() {
    localStorage.removeItem(PINNEDKEY)
  }
  _getQuizFromStorage(index) {
    const quizzes = JSON.parse(localStorage.getItem(QUIZZESKEY))
    if (quizzes) {
      return index !== undefined ? quizzes[index] || {} : quizzes
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
  submitAnswers({ override = true }) {
    console.log('submitting answers')
    return new Promise((resolve, reject) => {
      const storedQuizzes = this._getQuizFromStorage()
      const submitted = this._getSubmittedFromStorage()
      // current quiz and quizzes that are in local storage but not in submitted list will be submitting
      const submitting = []
      for (let key in storedQuizzes) {
        if (submitted.indexOf(parseInt(key)) === -1 || (override && parseInt(key) === this.state.currentIndex)) {
          submitting.push({ index: parseInt(key), userAnswers: storedQuizzes[key].answers})
        }
      }
      console.log(submitting)
      if (submitting.length === 0) {
        console.log('all answers has been submitted')
        resolve()
        return
      }
      const session = this.myTest.session
      const urlBasePath = this.props.urlBasePath || ''
      xhttp.put(`${urlBasePath}/exam/solution`, { session, questions: submitting }, (status, response) => {
        if (status === 200) {
          const submittedQuizzes = this.state.submittedQuizzes
          // submitting qill be submitted after completed
          submitting.forEach(q => {
            if (submittedQuizzes.indexOf(q.index) === -1) {
              submittedQuizzes.push(q.index)
            }
          })
          this.setState({ submittedQuizzes })
          this._storeSubmittedToStorage(submittedQuizzes)
          console.log('submitted answers')
          resolve()
        } else {
          this.setState({toast: 'Failed to submit answer. Please continue with your test. Your answers will be submitted later'})
          reject()
        }
      })
    })
  }
  _getSubmittedFromStorage() {
    const submitted = localStorage.getItem(SUBMITTEDKEY)
    if (submitted && submitted.length > 0) {
      return JSON.parse(submitted)
    } else {
      return []
    }
  }
  _storeSubmittedToStorage(submitted) {
    localStorage.setItem(SUBMITTEDKEY, JSON.stringify(submitted))
  }
  _clearAllSubmittedFromStorage() {
    localStorage.removeItem(SUBMITTEDKEY)
  }
  timeout() {
    this.setState({ timeout: true, showEndPopup: true })
  }
  finishTest(e) {
    this.submitAnswers({ override: false }).then( () => this.setState({ finish: true }) )
  }
  _storeSession(session) {
    localStorage.setItem(SESSIONKEY, session)
  }
  _getSession() {
    return localStorage.getItem(SESSIONKEY)
  }
  _clearSession() {
    localStorage.removeItem(SESSIONKEY)
  }
  _clearLocalStorage() {
    this._clearAllQuizsFromStorage()
    this._clearAllPinnedFromStorage()
    this._clearAllSubmittedFromStorage()
    this._clearSession()
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