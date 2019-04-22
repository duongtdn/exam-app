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

const QUIZZESKEY = '__$quizzes__'
const PINNEDKEY = '__$pinned__'
const SUBMITTEDKEY = '__$submitted__'

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
      finish: false
    }
    this._timer = null
    this.myTest = null
    const bindMethods = [
      'nextQuiz', 'previousQuiz', 'pinQuiz', 'unpinQuiz',
      'updateAnswers', 'getSavedAnswers', 'updateInternalState', 'getSavedInternalState', 'submitAnswers',
      'timeout'
    ]
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
          this.setState({ loadContext: 'Assets' })
          this.myTest = JSON.parse(response)
          console.log(this.myTest)
          this.loadAssets( () => {
            const course = this.myTest.courseId
            const type = this.myTest.type
            const pinnedQuizzes = this._getPinnedFromStorage()
            const submittedQuizzes = this._getSubmittedFromStorage()
            this.setState({ course, type, today, loading: false, timerOnOff: 'on', pinnedQuizzes, submittedQuizzes })
          })
        }
      })
    } else {
      this.setState({ error: '400 Bad Request', loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading loadContext = {this.state.loadContext} />)
    }

    if (this.state.error) {
      return (<div className="w3-container"> {this.state.error} </div>)
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
                  finish = {e => this.setState({ finish: true })}
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
              <StatusBar  testDuration = {this.myTest.duration * 0.60}
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
  submitAnswers() {
    console.log('submitting answers')
    const storedQuizzes = this._getQuizFromStorage()
    const submitted = this._getSubmittedFromStorage()
    // current quiz and quizzes that are in local storage but not in submitted list will be submitting
    const submitting = []
    for (let key in storedQuizzes) {
       if (submitted.indexOf(parseInt(key)) === -1 || parseInt(key) === this.state.currentIndex) {
        submitting.push({ index: parseInt(key), userAnswers: storedQuizzes[key].answers})
       }
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
        // this.nextQuiz()
      } else {
        this.setState({err: response})
      }
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
  timeout() {
    // later, handle more for timeout event rather than stopTimer and show end popup only,
    // for example, submit last question, show popup, lock test...
    this.setState({ timeout: true, showEndPopup: true })
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