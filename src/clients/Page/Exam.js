"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

export default class Exam extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h2> EXAM </h2>
        <button onClick={() => this.requestNewSession()}> New Session </button>
      </div>
    )
  }
  requestNewSession() {
    const urlBasePath = this.props.urlBasePath || ''
    xhttp.post(`${urlBasePath}/exam/session`, {course: ''}, (status, response) => {
      console.log(status)
      console.log(response)
    })
  }
}