"use strict"

import React, { Component } from 'react'

export default class Title extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(      
      <div style={{marginTop: '10px'}}> 
        <label className="w3-text-blue w3-large" style={{fontWeight:'bold'}}> <span className="w3-text-black"> Course: </span>{this.props.course} ({this.props.type}) </label> <br />
        <label className="w3-text-grey w3-small"> {this.props.today}</label>
      </div>              
    )
  }
}
