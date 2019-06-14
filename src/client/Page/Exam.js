"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import storage from '../lib/storage'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'
import EndPopup from './EndPopup'
import Loading from './Loading'
import Finish from './Finish'
import Toast from './Toast'
import Error from './Error'
import Intro from './Intro'
import UserNotSignedIn from './UserNotSignedIn'

const SESSIONKEY = '__$sss__'

class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: undefined,
      type: undefined,
      error: null,
      intro: true,
      loading: false,
      loadContext: 'Tests',
      timerOnOff: 'off',
      currentIndex: 0,
      showEndPopup: false,
      timeout: false,
      finish: false,
      toast: '',
      lockSubmitBtn: false,
      lockBackBtn: true,
    }
    this._timer = null
    this.myTest = null
    this.startAt = 0
    const bindMethods = [
      'nextQuiz', 'previousQuiz', 'pinQuiz', 'unpinQuiz',
      'updateAnswers', 'getSavedAnswers', 'updateInternalState', 'getSavedInternalState', '_removeSubmittedFromStorage',
      'submitAllAnswers', 'submitAnswers', '_sendAnswers',
      'timeout', 'finishTest', '_clearLocalStorage', 'loadTest', '_loadTest', 'submitTestCompletion'
    ]
    bindMethods.forEach( method => this[method] = this[method].bind(this) )
  }

  componentDidMount() {
    if (this._getSession()) {
      this.loadTest()
    }
  }

  loadTest() {
    this._loadTest()
        .then(state => this.setState(state))
        .catch( e => this.setState({...e, loading: false }))
  }

  _loadTest() {
    const today = getToday();
    const testId = getTestIdFromHref(window.location.href)
    return new Promise((resolve, reject) => {
      if (testId) {
        this.setState({ loading: true, intro: false})
        this.requestNewSession(testId, (err, response) => {
          if (err) {
            if (err === 403) {
              reject({ error: {code: err, title: 'Invalid Test Session', message: 'Invalid Test or this Test has been expired'}})
            } else if (err === 404) {
              reject({ error: {code: err, title: '404 - Test not found', message: 'This test has been finished'}})
            } else {
              reject({ error: {code: err, title: err, message: 'Error found when requesting new Test session'}})
            }
            this._clearLocalStorage()
          } else {
            this.setState({ loadContext: 'Assets' })
            this.myTest = JSON.parse(response)
            console.log(this.myTest)
            this._storeSession(this.myTest.session)
            this.loadAssets( () => {
              const course = this.myTest.courseId
              const type = this.myTest.type
              resolve({ course, type, today, loading: false, timerOnOff: 'on' })
            })
            this.startAt = this._elapsedTimeBefore()
          }
        })
      } else {
        reject({ error: {code: 400, title: '400 Bad Request', message: 'Invalid Test session'}})
      }
    })
  }

  _elapsedTimeBefore() {
    const now = new Date()
    const startAt = new Date(this.myTest.startAt)
    const diff = (now.getTime() - startAt.getTime())/1000
    return parseInt(diff)
  }

  render() {
    if (this.state.intro) {
      return (<Intro enterTest={this.loadTest} />)
    }
    if (this.state.loading) {
      return (<Loading loadContext = {this.state.loadContext} />)
    }
    if (this.state.error) {
      return (<Error error = {this.state.error} />)
    }
    if (this.state.finish) {
      return (<Finish resultId={this.myTest.resultId}/>)
    }
    return (
      <div>
        <EndPopup show = {this.state.showEndPopup}
                  close = {evt => this.setState({ showEndPopup: false })}
                  totalQuizzes = {this.myTest.content.questions.length}
                  timeout = {this.state.timeout}
                  finish = {this.finishTest}
        />
        <Toast  show = { this.state.toast.length > 0 }
                toast = {this.state.toast}
                close = { () => this.setState({ toast: '' }) }
                top
        />
        <Header endgame = {evt => this.setState({ showEndPopup: true })}
                user = {this.props.user}
                accountClient = {this.props.accountClient}
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
                          updateAnswers = {this.updateAnswers}
                          getSavedAnswers = {this.getSavedAnswers}
                          updateInternalState = {this.updateInternalState}
                          getSavedInternalState = {this.getSavedInternalState}
                          submitAnswers = {this.submitAllAnswers}
                          lockSubmitBtn = {this.state.lockSubmitBtn}
                          lockBackBtn = {this.state.lockBackBtn}
              />
            </div>
            <div className="w3-cell w3-hide-small" style={{verticalAlign: 'top', padding:'8px 0 8px 16px', width: '154px'}}>
              <StatusBar  testDuration = {this.myTest.duration * 60}
                          startAt = {this.startAt}
                          timerOnOff = {this.state.timerOnOff}
                          moveToQuiz = {index => this.moveToQuiz(index)}
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
      if (status === 201) {
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
    let lockBackBtn = false
    if (index === 0) {
      lockBackBtn = true
    }
    this.setState({ currentIndex: index, lockSubmitBtn: false, lockBackBtn })
  }
  nextQuiz() {
    const currentIndex = this.state.currentIndex
    if (currentIndex < this.myTest.content.questions.length-1) {
      this.submitAnswers()
      this.moveToQuiz(currentIndex+1)
    } else {
      this.setState({ showEndPopup: true })
    }
  }
  previousQuiz() {
    const currentIndex = this.state.currentIndex
    if (currentIndex > 0) {
      this.submitAnswers()
      this.moveToQuiz(currentIndex-1)
    }
  }
  pinQuiz(index) {
    const pinnedQuizzes = storage.get(storage.PINNEDKEY) || []
    if (pinnedQuizzes.indexOf(index) === -1) {
      pinnedQuizzes.push(index)
      storage.update(storage.PINNEDKEY, pinnedQuizzes)
    }
  }
  unpinQuiz(index) {
    const pinnedList = storage.get(storage.PINNEDKEY) || []
    const pinnedQuizzes = pinnedList.filter( _index => {
      return (index !== _index)
    })
    storage.update(storage.PINNEDKEY, pinnedQuizzes)
  }
  _getQuizFromStorage(index) {
    const quizzes = storage.get(storage.QUIZZESKEY)
    if (quizzes) {
      return index !== undefined ? quizzes[index] || {} : quizzes
    } else {
      return {}
    }
  }
  _storeQuizToStorage(index, quiz) {
    const quizzes = storage.get(storage.QUIZZESKEY) || {}
    quizzes[index] = quiz
    storage.update(storage.QUIZZESKEY, quizzes)
  }
  updateAnswers(answers) {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    if (JSON.stringify(answers) === JSON.stringify(quiz.answers)) {
      // answer is identical with cached one. No update
      return
    }
    quiz.answers = answers
    this._storeQuizToStorage(index, quiz)
    // since answer has been changed, need to remove it from submitted list
    this._removeSubmittedFromStorage(index)
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
  _sendAnswers(answers, done) {
    const session = this.myTest.session
    const urlBasePath = this.props.urlBasePath || ''
    const uid = 'awesome-dev' // fake uid for dev only
    const _to = setTimeout( () => {
      this.setState({toast: 'Failed to submit answer. Please continue with your test. Your answers will be submitted next time'})
      done({returnedStatus: 408})
    }, 5000)
    xhttp.put(`${urlBasePath}/exam/solution`, { uid, session, questions: answers }, (status, response) => {
      if (status === 200) {
        const submittedQuizzes = storage.get(storage.SUBMITTEDKEY) || []
        // submitting will be submitted after completed
        answers.forEach(q => {
          if (submittedQuizzes.indexOf(q.index) === -1) {
            submittedQuizzes.push(q.index)
          }
        })
        storage.update(storage.SUBMITTEDKEY, submittedQuizzes)
        clearTimeout(_to)
        done(null)
      } else {
        this.setState({toast: 'Failed to submit answer. Please continue with your test. Your answers will be submitted next time'})
        clearTimeout(_to)
        done({returnedStatus: status})
      }
    })
  }
  submitAnswers() {
    const storedQuizzes = this._getQuizFromStorage()
    const submitted = storage.get(storage.SUBMITTEDKEY) || []
    const index = this.state.currentIndex
    if (storedQuizzes[index] === undefined) {
      return
    }
    if (submitted.indexOf(index) !== -1) {
      return
    }
    const submitting = [{
      index, userAnswers: storedQuizzes[index].answers
    }]
    this.setState({ lockSubmitBtn: true })
    this._sendAnswers(submitting, (err) => {
      this.setState({ lockSubmitBtn: false })
    })
  }
  submitAllAnswers({ override = true }) {
    return new Promise((resolve, reject) => {
      const storedQuizzes = this._getQuizFromStorage()
      const submitted = storage.get(storage.SUBMITTEDKEY) || []
      // current quiz and quizzes that are in local storage but not in submitted list will be submitting
      const submitting = []
      for (let key in storedQuizzes) {
        if (submitted.indexOf(parseInt(key)) === -1 || (override && parseInt(key) === this.state.currentIndex)) {
          submitting.push({ index: parseInt(key), userAnswers: storedQuizzes[key].answers})
        }
      }
      if (submitting.length === 0) {
        resolve()
        return
      }
      this._sendAnswers(submitting, (err) => {
        this.setState({ lockSubmitBtn: false })
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  _removeSubmittedFromStorage(quizIndex) {
    const submitted = storage.get(storage.SUBMITTEDKEY)
    if (submitted === null) {
      return
    }
    const index = submitted.indexOf(quizIndex)
    if (index > -1) { submitted.splice(index,1) }
    storage.update(storage.SUBMITTEDKEY, submitted)
  }
  timeout() {
    this.finishTest()
    this.setState({ timeout: true, showEndPopup: true })
  }
  finishTest(e) {
    this.submitAllAnswers({ override: false })
        .then(this.submitTestCompletion)
        .then( () => {
          this._clearLocalStorage()
          this.setState({ finish: true })
        })
        .catch( err => console.log(err) )
  }
  submitTestCompletion() {
    return new Promise((resolve, reject) => {
      const urlBasePath = this.props.urlBasePath || ''
      const session = this.myTest.session
      const uid = 'awesome-dev' // fake uid for dev only
      const _to = setTimeout( () => {
        this.setState({toast: 'Network Error: Failed to submit test completion.'})
        done({returnedStatus: 408})
      }, 5000)
      xhttp.put(`${urlBasePath}/exam/session`, { uid, session, finish: true}, (status, response) => {
        if (status === 200) {
          clearTimeout(_to)
          resolve()
        } else {
          this.setState({toast: 'Error: Failed to submit test completion'})
          clearTimeout(_to)
          reject({returnedStatus: status})
        }
      })
    })
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
    storage.clear(storage.QUIZZESKEY)
    storage.clear(storage.PINNEDKEY)
    storage.clear(storage.SUBMITTEDKEY)
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
  const dd = today.getDate()
  const mm = ("00" + (today.getMonth()+1)).slice(-2); //January is 0!
  const yyyy = today.getFullYear();
  return `${weekday[today.getDay()]} ${dd}-${mm}-${yyyy}`
}

export default class ExamApp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.user === null) {
      return ( null )
    }
    if (this.props.user === undefined) {
      return ( <UserNotSignedIn /> )
    }
    return (
      <Exam urlBasePath = {this.props.urlBasePath}
            urlQuizzesBasePath = {this.props.urlQuizzesBasePath}
            user = {this.props.user}
            accountClient = {this.props.accountClient}
            template = {this.props.template}
      />
    )
  }
}
