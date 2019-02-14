"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'
import Title from './Widgets/Title'
import StatusBar from './Widgets/StatusBar'
import QuizBoard from './Widgets/QuizBoard'

export default class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: undefined,
      type: undefined,
      error: null
    }
  }

  componentWillMount() {
    const today = getToday();
    const { course, type } = getCourseIdFromHref(window.location.href)
    if (course) {
      this.setState({ course, type, today })
    } else {
      this.setState({ error: '400 Bad Request' })
    }
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
            <StatusBar />
            <QuizBoard />
          </div>          
          {/* <button onClick={() => this.requestNewSession()}> New Session </button> */}
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