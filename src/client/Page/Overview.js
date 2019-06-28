"use strict"

import React, { Component } from 'react'

export default class Overview extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="w3-container">
        <div style={{margin: 'auto', width: '280px', textAlign: 'center', paddingTop: '30px'}}>
          <span className='w3-large w3-text-blue'> Test Overview </span>
          <br />
          <span className='w3-text-blue-grey'> ... </span>
        </div>
        <div className='' style={{margin: 'auto', marginTop:'30px', width: '280px', textAlign: 'center', padding: '20px'}}>
          <button className="w3-button w3-blue" onClick={this.props.enterTest}> Start </button>
        </div>
      </div>
    )
  }
}
