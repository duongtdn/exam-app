"use strict"

import React, { Component } from 'react'

export default class StatusBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="" style={{margin: '8px 0'}}>
        <div className="w3-cell w3-pale-green w3-padding" style={{display: 'inline-block', textAlign: 'center', margin: '4px 8px 0 0'}}>
          <div className="w3-text-green w3-small"> Completion (20%) </div>
          <div className="w3-text-green w3-large" style={{fontWeight: 'bold', marginTop: '6px'}}> 15/100 </div>
        </div>  
        <div className="w3-cell w3-pale-yellow w3-padding" style={{display: 'inline-block', textAlign: 'center', margin: '4px 8px 0 0'}}>
          <div className="w3-text-yellow w3-small"> Time Left </div>
          <div className="w3-text-yellow w3-large" style={{fontWeight: 'bold', marginTop: '6px'}}> 01:05:56 </div> 
        </div> 
        <div className="w3-cell w3-pale-blue w3-padding  w3-cell-top w3-hide-small" style={{display: 'inline-block', textAlign: 'left', margin: '4px 0', width: 'calc(100% - 300px)'}}>
          <div className="w3-text-blue w3-small">Skipped Quiz </div>   
          <div className="">
            {
              [...Array(100).keys()].map( i => (
                <div className="w3-blue" key={i} style={{height: '25px', width: '25px', borderRadius: '50%', textAlign: 'center', display: 'inline-block', margin: '8px 4px 0 0', cursor: 'pointer'}}> 
                  <span className="w3-small"> {i+1} </span>
                </div>
              ))
            }
          </div>            
        </div>     
        <div className="w3-cell w3-pale-blue w3-padding  w3-hide-medium w3-hide-large" style={{display: 'inline-block', textAlign: 'left', margin: '4px 0', width: '100%'}}>
          <div className="w3-text-blue w3-small"> Skipped Quiz <i className = "fa fa-sort-down w3-large" style={{margin: '0 8px'}} /> </div>   
          <div className="w3-show">
            <hr />
            {
              [...Array(10).keys()].map( i => (
                <div className="w3-blue" key={i} style={{height: '25px', width: '25px', borderRadius: '50%', textAlign: 'center', display: 'inline-block', margin: '8px 4px 0 0', cursor: 'pointer'}}> 
                  <span className="w3-small"> {i+1} </span>
                </div>
              ))
            }
          </div>            
        </div>
      </div>
    )
  }
}
