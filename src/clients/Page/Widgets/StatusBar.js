"use strict"

import React, { Component } from 'react'

export default class StatusBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="">
        <label className="w3-panel w3-pale-green w3-padding" style={{display: 'inline-block', textAlign: 'center'}}>
          <div className="w3-text-green w3-small"> Completion (20%) </div>
          <div className="w3-text-green w3-large" style={{fontWeight: 'bold', marginTop: '6px'}}> 15/100 </div>
        </label>  
        <label className="w3-pale-yellow w3-padding" style={{display: 'inline-block', textAlign: 'center', marginLeft: '18px'}}>
          <label style={{display: 'inline-block'}}>
            <div className="w3-text-yellow w3-small"> Time Left </div>
            <div className="w3-text-yellow w3-large" style={{fontWeight: 'bold', marginTop: '6px'}}> 01:05:56 </div>
          </label>   
        </label>  
      </div>
    )
  }
}
