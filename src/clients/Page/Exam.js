"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'

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
      score: 40,
      question: 4
    },
    {
      title: 'Pointer in C',
      description: 'This section test the overral knowledge and your undestand of pointer used in C',
      score: 60,
      question: 6
    }
  ],
  questions: [
    {
      section: 0,
      problem: 'Problem statement of question 1: bla bla bla....',
      score: 10
    },
    {
      section: 0,
      problem: 'Problem statement of question 2: bla bla bla....',
      score: 10
    },
    {
      section: 0,
      problem: 'Problem statement of question 3: bla bla bla....',
      score: 10
    },
    {
      section: 0,
      problem: 'Problem statement of question 4: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 5: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 6: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 7: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 8: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 9: bla bla bla....',
      score: 10
    },
    {
      section: 1,
      problem: 'Problem statement of question 10: bla bla bla....',
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
    const bindMethods = ['nextQuiz', 'previousQuiz', 'saveQuiz']
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
          <div className="w3-container">
            <Title  course = {this.state.course}
                    type = {this.state.type}
                    today = {this.state.today}
            />
            <StatusBar  testDuration = {this.state.testDuration}
                        eslapsedTime = {this.state.eslapsedTime}
                        savedQuizs = {this.state.savedQuizs}
            />
            <QuizBoard  questions = {this.myTest.questions} 
                        currentIndex = {this.state.currentIndex}
                        next = {this.nextQuiz}
                        previous = {this.previousQuiz}
                        saveQuiz = {this.saveQuiz}
                        savedQuizs = {this.state.savedQuizs}
            />
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