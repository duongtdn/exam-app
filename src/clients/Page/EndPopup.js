"use strict"

import React, { Component } from 'react'

export default class EndPopup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(      
      <div className="w3-modal" style={{ display: this.props.show ? 'block' : 'none' }}>
         <div className="w3-modal-content">
          <div className="w3-container w3-padding">
            <h3> End Game </h3>
            {
              this.props.timeout ? 
                <div> You have run out of time </div>
              :
                <div> There's still time. Dou you really one to finish your test </div>
            }
            <div> <button className="w3-button w3-blue" onClick = {this.props.close}> Close </button> </div>
          </div>
        </div>
      </div>              
    )
  }
}
