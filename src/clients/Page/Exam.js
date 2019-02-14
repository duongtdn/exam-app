"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import Header from './Widgets/Header'

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
    const { course, type } = getCourseIdFromHref(window.location.href)
    if (course) {
      this.setState({ course, type })
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
            <p> 
              <label className="w3-text-blue w3-large" style={{fontWeight:'bold'}}> <span className="w3-text-black"> Course: </span>{this.state.course} ({this.state.type}) </label> <br />
              <label className="w3-text-grey w3-small"> Date: </label>
            </p>            
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