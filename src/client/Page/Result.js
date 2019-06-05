"use strict"

import React, { Component } from 'react'

export default class Result extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div >
        <div className="w3-container">
          <h3 className="w3-text-blue"> Result Page </h3>
          {
            this.props.data.result ? this._renderResult() : this._renderNoResult()
          }
        </div>
      </div>
    )
  }
  _renderNoResult() {
    return (
      <div>
        <p> Your test result is not ready yet. Please come back later </p>
      </div>
    )
  }
  _renderResult() {
    return (
      <div>
        <p> Result Here </p>
      </div>
    )
  }
}
