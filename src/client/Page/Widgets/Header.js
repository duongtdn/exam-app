"use strict"

import React, { Component } from 'react'

class UserSnipet extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
  }
  render() {
    const user = this.props.user
    return (
      <div className="w3-bar-item w3-dropdown-click" style={{margin: '4px 0', padding: '3px 16px', cursor: 'pointer'}}>
        <span onClick={e => this.setState({show: !this.state.show})}>
          <img className="w3-circle w3-border w3-border-white"style={{width: '35px'}} src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100" />
          {' '}
          <span className="w3-text-blue-grey" style={{marginRight: '4px'}}>{user.profile.displayName}</span>
          {' '}
          <i className="w3-text-dark-grey fa fa-ellipsis-v" />
        </span>
        {/* <button className="w3-button" onClick={evt => this.props.accountClient.signout()}> Logout </button> */}
        <div className={`${this.state.show? 'w3-show': ''} w3-dropdown-content w3-bar-block w3-border`} style={{margin: '3px 0px 3px -16px', minWidth: '131px'}}>
          <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signout()}> Logout </button>
        </div>
      </div>
    )
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <header className="">
        <div className="w3-bar" style={{maxWidth: '1200px', margin: 'auto'}}>
            <div className="w3-bar-item">
              Test Room
            </div>
            <div className={`w3-right w3-container ${this.props.endgame? '' : ' w3-hide'}`}>
              {/* <button className="w3-bar-item w3-button" onClick={this.props.endgame}> Finish </button> */}
              {
                this.props.user?
                  <UserSnipet user={this.props.user}
                              accountClient={this.props.accountClient}
                              endgame={this.props.endgame}
                  />
                : null
              }
            </div>
        </div>
      </header>
    )
  }
}
