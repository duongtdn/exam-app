"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

export default class Exam extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const courseId = getCourseIdFromHref(window.location.href)
    if (courseId) {
      this.setState({ courseId })
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
          <h2> EXAM / {this.state.courseId} </h2>
          <button onClick={() => this.requestNewSession()}> New Session </button>
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
  return href.split('?')[1].split('=')[1]
}