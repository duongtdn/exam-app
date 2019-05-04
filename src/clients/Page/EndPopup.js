"use strict"

import React, { Component } from 'react'

export default class EndPopup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.timeout) {
      return this.renderIfTimeout()
    } else {
      return this.renderIfNotTimeout()
    }
  }
  renderIfTimeout() {
    return(      
      <div className="w3-modal" style={{ display: this.props.show ? 'block' : 'none' }}>
         <div className="w3-modal-content">
          <div className="w3-container w3-padding">
            <h3> End Game </h3>

            <div> You have run out of time </div>

            <div> <button className="w3-button w3-blue" onClick = {this.props.finish}> Submit all left answers & Finish </button> </div>
          </div>
        </div>
      </div>
    )
  }
  renderIfNotTimeout() {
    return(
      <div className="w3-modal" style={{ display: this.props.show ? 'block' : 'none' }}>
         <div className="w3-modal-content">
          <div className="w3-container w3-padding">
            <h3> End Game </h3>

            <div> There's still time. Dou you really one to finish your test </div>

            <br />
            <div> <button className="w3-button w3-blue" onClick = {this.props.close}> Cancel </button> </div>
            <br />
            <div> <button className="w3-button w3-blue" onClick = {this.props.finish}> Submit all left answers & Finish </button> </div>
          </div>
        </div>
      </div>              
    )
  }
}
