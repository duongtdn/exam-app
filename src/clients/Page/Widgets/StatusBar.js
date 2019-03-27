"use strict"

import React, { Component } from 'react'

class CircleTag extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const i = this.props.value
    return (
      <div  className="w3-blue" key={i} 
            style={{height: '30px', width: '30px', borderRadius: '50%', textAlign: 'center', display: 'inline-block', margin: '8px 4px 0 0', cursor: 'pointer', padding: '2px 0px'}}
            onClick = {this.props.onClick}> 
        <span className="w3-small"> {i+1} </span>
      </div>
    )
  } 
}

class PinnedQuizesList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {
          this.props.pinnedQuizes.map( i => (
            <CircleTag key={i} value = {i} onClick={ e => this.props.moveToQuiz(i)} />
          ))
        }
      </div>
    )
  }
}

export default class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eslapsedTime: 0
    }
  }
  componentDidMount() {
    if (this.props.timerOnOff === 'on') {
      this.startEslapsedTimer()
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.timerOnOff === 'on' && prevProps.timerOnOff === 'off') {
      this.startEslapsedTimer()
    }
  }
  render() {
    const remainingTime = this.props.testDuration - this.state.eslapsedTime
    const timerColor = (this.props.testDuration/remainingTime > 3) ? 'red' : 'yellow'
    return(
      <div style={{margin: '8px 0'}}>
        {/* for medium screen */}
        <div className="w3-hide-large w3-hide-small" >
          <div className="w3-pale-green w3-padding" style={{textAlign: 'center', width: '154px', marginBottom: '6px'}}>
            <div className="w3-text-green w3-small"> Completion (15%) </div>
            <div className="w3-text-green w3-large" style={{fontWeight: 'bold', marginTop: 0}}> 15/100 </div>
          </div>  
          <div className={`w3-pale-${timerColor} w3-padding`} style={{textAlign: 'center', width: '154px', marginBottom: '6px'}}>
            <div className={`w3-text-${timerColor} w3-small`}> Time Left </div>
            <div className={`w3-text-${timerColor} w3-large`} style={{fontWeight: 'bold', marginTop: 0}}> {formatTime(remainingTime)} </div> 
          </div> 
          <div className="w3-pale-blue w3-padding  w3-cell-top w3-hide-small" style={{ textAlign: 'left', margin: '4px 0', width: '154px'}}>
            <div className="w3-text-blue w3-small"> Pinned questions </div>
            <div className="" style={{minHeight: '37px'}}>
              <PinnedQuizesList pinnedQuizes={this.props.pinnedQuizes} moveToQuiz={this.props.moveToQuiz} />
            </div>            
          </div>     
        </div>
        {/* for large screen */}
        <div className="w3-hide-medium w3-hide-small">
          <div style={{ width: '310px', marginBottom: '6px'}}>
            <div className="w3-pale-green w3-padding" style={{display: 'inline-block', textAlign: 'center', width: '154px', marginRight: '2px'}}>
              <div className="w3-text-green w3-small"> Completion (15%) </div>
              <div className="w3-text-green w3-large" style={{fontWeight: 'bold', marginTop: 0}}> 15/100 </div>
            </div>  
            <div className={`w3-pale-${timerColor} w3-padding`} style={{display: 'inline-block', textAlign: 'center', width: '154px'}}>
              <div className={`w3-text-${timerColor} w3-small`}> Time Left </div>
              <div className={`w3-text-${timerColor} w3-large`} style={{fontWeight: 'bold', marginTop: 0}}> {formatTime(remainingTime)} </div> 
            </div> 
          </div>
          <div className="w3-pale-blue w3-padding w3-cell-top" style={{ textAlign: 'left', margin: '4px 0', width: '310px'}}>
            <div className="w3-text-blue w3-small"> Pinned questions </div>
            <div className="" style={{minHeight: '37px'}}>
              <PinnedQuizesList pinnedQuizes={this.props.pinnedQuizes} moveToQuiz={this.props.moveToQuiz} />
            </div>            
          </div>     
        </div>
      </div>
      
    )
  }
  startEslapsedTimer() {
    this._timer = setInterval(() => { 
      const eslapsedTime = this.state.eslapsedTime + 1      
      this.setState({ eslapsedTime })
      if (eslapsedTime === this.props.testDuration) {
        // later, handle more for timeout event rather than stopTimer only,
        // for example, submit last question, show popup, lock test...
        this.stopEslapsedTimer()
        console.log('timeout')
      }
    }, 1000)
  }
  stopEslapsedTimer() {
    clearInterval(this._timer)
    this.props.onTimeout && this.props.onTimeout()
  }
}

function formatTime(time) {
  const hh = Math.floor(time/3600)
  const mm = Math.floor((time%3600)/60)
  const ss = time - hh*3600 - mm*60
  return `${("00"+hh).slice(-2)}:${("00"+mm).slice(-2)}:${("00"+ss).slice(-2)}`
}
