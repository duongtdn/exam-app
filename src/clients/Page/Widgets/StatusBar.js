"use strict"

import React, { Component } from 'react'

class CircleTag extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const i = this.props.value
    return (
      <div className="w3-blue" key={i} style={{height: '30px', width: '30px', borderRadius: '50%', textAlign: 'center', display: 'inline-block', margin: '8px 4px 0 0', cursor: 'pointer', padding: '2px 0px'}}> 
        <span className="w3-small"> {i+1} </span>
      </div>
    )
  } 
}

export default class StatusBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="" style={{margin: '8px 0'}}>
        <div className="w3-cell w3-pale-green w3-padding" style={{display: 'inline-block', textAlign: 'center', margin: '4px 4px 0 0', width: '154px'}}>
          <div className="w3-text-green w3-small"> Completion (15%) </div>
          <div className="w3-text-green w3-large" style={{fontWeight: 'bold', marginTop: '10px'}}> 15/100 </div>
        </div>  
        <div className="w3-cell w3-pale-yellow w3-padding" style={{display: 'inline-block', textAlign: 'center', margin: '4px 4px 0 0', width: '124px'}}>
          <div className="w3-text-yellow w3-small"> Time Left </div>
          <div className="w3-text-yellow w3-large" style={{fontWeight: 'bold', marginTop: '10px'}}> 01:05:56 </div> 
        </div> 
        <div className="w3-cell w3-pale-blue w3-padding  w3-cell-top w3-hide-small" style={{display: 'inline-block', textAlign: 'left', margin: '4px 0', width: 'calc(100% - 286px)'}}>
          <div className="w3-text-blue w3-small">Saved Quiz </div>
          <div className="" style={{minHeight: '37px'}}>
            {
              [...Array(0).keys()].map( i => (
                <CircleTag key={i} value = {i} />
              ))
            }
          </div>            
        </div>     
        <div className="w3-cell w3-pale-blue w3-padding  w3-hide-medium w3-hide-large" style={{display: 'inline-block', textAlign: 'left', margin: '4px 0', width: '100%'}}>
          <div className="w3-text-blue w3-small"> Saved Quiz <i className = "fa fa-sort-down w3-large" style={{margin: '0 8px'}} /> </div>   
          <div className="w3-show">
            <hr />
            {
              [...Array(0).keys()].map( i => (
                <CircleTag key={i} value = {i} />
              ))
            }
          </div>            
        </div>
      </div>
    )
  }
}
