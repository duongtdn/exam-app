"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'

const QUIZSKEY = '__$quizs__'

/* Data using for dev only, will replace later */
const myTest = {
  testId: 'my-test-id',
  createdAt: new Date(),
  submittedAt: undefined,
  duration: 30,
  sections: [
    {
      title: 'Datatype of C',
      description: 'This section test the overral knowledge and your undestand of Datatype used in C',
      score: 10,
      question: 6
    },
    {
      title: 'Pointer in C',
      description: 'This section test the overral knowledge and your undestand of pointer used in C',
      score: 20,
      question: 2
    }
  ],
  questions: [
    {
      section: 0,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-red","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-blue","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-green","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    },
    {
      section: 0,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-deep-orange","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-pink","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-indigo","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    },
    {
      section: 0,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-red","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-blue","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-green","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    },
    {
      section: 0,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-deep-orange","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-pink","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-indigo","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    },
    {
      section: 1,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-red","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-blue","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-green","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    },
    {
      section: 1,
      problem: '{"props":{"className":"w3-container w3-border w3-border-grey w3-padding","width":"700px","height":"500px","updateAnswers":true,"getSavedAnswers":true,"updateInternalState":true,"getSavedInternalState":true},"type":"DragZone","children":[{"type":"div","props":{},"children":[{"type":"DragItem","props":{"id":"$1"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-deep-orange","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$2","left":"120px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-pink","style":{"width":"150px","height":"100px"}},"children":[" Drag Me "]}," "]},{"type":"DragItem","props":{"id":"$3","left":"280px"},"children":[" ",{"type":"div","props":{"className":"w3-container w3-indigo","style":{"width":"100px","height":"100px"}},"children":[" Drag Me "]}," "]}]},{"type":"DropHolder","props":{"id":"$dh_1","layout":{"spacing":{"top":10,"left":20}},"width":"190px","height":"120px","top":"150px","left":"10px","dropLimit":1}},{"type":"DropHolder","props":{"id":"$dh_2","width":"390px","height":"120px","top":"300px","left":"10px","dropLimit":2}},{"type":"DropHolder","props":{"id":"$dh_3","layout":{"type":"stack","spacing":{"top":20,"left":10}},"width":"170px","height":"380px","top":"50px","left":"500px"}}]}',
      score: 10
    }
  ]
}


export default class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: undefined,
      type: undefined,
      error: null,
      eslapsedTime: 0,  // ms
      testDuration: 0,   // ms
      currentIndex: 0,
      savedQuizs: []
    }
    this._timer = null
    this.myTest = null
    const bindMethods = ['nextQuiz', 'previousQuiz', 'saveQuiz', 'unsaveQuiz', 'updateAnswers', 'getSavedAnswers', 'updateInternalState', 'getSavedInternalState']
    bindMethods.forEach( method => this[method] = this[method].bind(this) )
  }

  componentWillMount() {
    const today = getToday();
    const { course, type } = getCourseIdFromHref(window.location.href)
    if (course) {
      this.setState({ course, type, today })
    } else {
      this.setState({ error: '400 Bad Request' })
    }
    // TBD: set testDuration and start timer after recieved data from server
    this.myTest = myTest
    this.setState({ testDuration: this.myTest.duration * 60 }) // tested value 3671
    // this.startEslapsedTimer()
  }

  render() {
    if (this.state.error) {
      return (<div className="w3-container"> {this.state.error} </div>)
    } else {
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
                <QuizBoard  questions = {this.myTest.questions} 
                            currentIndex = {this.state.currentIndex}
                            next = {this.nextQuiz}
                            previous = {this.previousQuiz}
                            saveQuiz = {this.saveQuiz}
                            unsaveQuiz = {this.unsaveQuiz}
                            savedQuizs = {this.state.savedQuizs}
                            updateAnswers = {this.updateAnswers}
                            getSavedAnswers = {this.getSavedAnswers}
                            updateInternalState = {this.updateInternalState}
                            getSavedInternalState = {this.getSavedInternalState}
                />
              </div>
              <div className="w3-cell w3-hide-small" style={{verticalAlign: 'top', padding:'8px 0 8px 16px', width: '154px'}}>
                <StatusBar  testDuration = {this.state.testDuration}
                            eslapsedTime = {this.state.eslapsedTime}
                            savedQuizs = {this.state.savedQuizs}
                            moveToQuiz = {index => this.moveToQuiz(index)}
                />
              </div>
            </div>
           
            
          </div>          
        </div>    
      )
    }
  }
  requestNewSession() {
    const urlBasePath = this.props.urlBasePath || ''
    xhttp.post(`${urlBasePath}/exam/session`, {course: ''}, (status, response) => {
      console.log(status)
      console.log(response)
    })
  }
  startEslapsedTimer() {
    this._timer = setInterval(() => { 
      const eslapsedTime = this.state.eslapsedTime + 1      
      this.setState({ eslapsedTime })
      if (eslapsedTime === this.state.testDuration) {
        // later, handle more for timeout event rather than stopTimer only,
        // for example, submit last question, show popup, lock test...
        this.stopEslapsedTimer()
        console.log('timeout')
      }
    }, 1000)
  }
  stopEslapsedTimer() {
    clearInterval(this._timer)
  }
  moveToQuiz(index) {
    this.setState({ currentIndex: index })
  }
  nextQuiz() {
    const currentIndex = this.state.currentIndex    
    if (currentIndex < this.myTest.questions.length-1) {
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
  saveQuiz(index) {
    const savedQuizs = this.state.savedQuizs
    if (savedQuizs.indexOf(index) === -1) {
      savedQuizs.push(index)
      this.setState({ savedQuizs })
    }    
  }
  unsaveQuiz(index) {
    const savedQuizs = this.state.savedQuizs.filter( _index => {
      return (index !== _index)
    })
    this.setState({ savedQuizs })
  }
  _getQuizFromStorage(index) {
    const quizs = JSON.parse(localStorage.getItem(QUIZSKEY))
    if (quizs) {
      return quizs[index] || {}
    } else {
      return {}
    }
  }
  _saveQuizToStorage(index, quiz) {
    const quizs = JSON.parse(localStorage.getItem(QUIZSKEY)) || {}
    quizs[index] = quiz
    localStorage.setItem(QUIZSKEY, JSON.stringify(quizs))
  }
  _clearAllQuizsFromStorage() {
    localStorage.removeItem(QUIZSKEY)
  }
  updateAnswers(answers) {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    quiz.answers = answers
    this._saveQuizToStorage(index, quiz)
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
    this._saveQuizToStorage(index, quiz)
  }
  getSavedInternalState() {
    const index = this.state.currentIndex
    const quiz = this._getQuizFromStorage(index)
    return quiz.state
  }
}

function getCourseIdFromHref(href) {
  const query = href.split('?')[1]
  const course= query.split('&')[0].split('=')[1]
  const type= query.split('&')[1].split('=')[1]
  return { course, type }
}

function getToday() {
  const weekday  = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = new Date()
  const dd = today.getDate();
  const mm = ("00" + (today.getMonth()+1)).slice(-2); //January is 0!
  const yyyy = today.getFullYear();
  return `${weekday[today.getDay()]} ${dd}-${mm}-${yyyy}`
}