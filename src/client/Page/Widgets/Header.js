"use strict"

import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <header className="w3-blue">
        <div className="w3-bar" style={{maxWidth: '1200px', margin: 'auto'}}>
            <div className="w3-bar-item">
              Test Room
            </div>
            <div className={`w3-right w3-container ${this.props.endgame? '' : ' w3-hide'}`}>
              <button className="w3-bar-item w3-button" onClick={this.props.endgame}> Finish </button>
            </div>
        </div>
      </header>
    )
  }
}
