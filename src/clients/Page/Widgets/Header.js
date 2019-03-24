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
            <div className="w3-right">
              <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signup()}> Sign up</button>
              <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signin()}> Sign in</button>
              <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signout()}> Sign out</button>
            </div>
        </div>
         
      </header>
    )
  }
}
