"use strict"

import React, { Component } from 'react'

import Quiz from 'react-quiz'
import addons from 'react-quiz/dist/addons'

export default class QuizBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const quiz = this.props.questions[this.props.currentIndex]
    return(
      <div className="">
        <div className="w3-panel w3-padding w3-light-grey w3-border w3-border-grey">
          <div className="w3-" style={{display: 'inline-block'}} >
            <div> 
              <label className="w3-text-grey w3-small"> Section: {quiz.section + 1} </label>            
            </div>
            <label> Quiz {this.props.currentIndex + 1} </label> 
            {/* <label className="w3-tag w3-green w3-small" style={{fontStyle: 'italic'}}> Answer Submitted </label> */}
            { this.props.savedQuizs.indexOf(this.props.currentIndex) !== -1 ? 
                <label className="w3-tag w3-blue w3-small" style={{fontStyle: 'italic'}}> Saved </label>
                : null
            }
          </div>
          
          <div className="w3-right" style={{display: 'inline-block', textAlign: 'center'}}>
            {/* <button className='w3-hover-blue' style={{border: 'none', background:'none', cursor: 'pointer'}} onClick={this.props.previous} > 
              <i className="fa fa-arrow-left" />
            </button>
            |
            <button className='w3-hover-blue' style={{border: 'none', background:'none', cursor: 'pointer'}} onClick={this.props.next} > 
              <i className="fa fa-arrow-right" /> 
            </button> */}
            <br />
            <label className="w3-text-blue-grey"> {quiz.score}pt </label>
          </div>
          
        </div>
        <div>
          {/* render Quiz here */}
          <div>
            <Quiz data={quiz} 
                  addons={addons} 
                  updateAnswers = {this.props.updateAnswers} 
                  getSavedAnswers = {this.props.getSavedAnswers}
                  updateInternalState = {this.props.updateInternalState}
                  getSavedInternalState = {this.props.getSavedInternalState}
            />
          </div>
          
          {/* render action buttons */}
          <div className="w3-row w3-panel w3-padding w3-border-top w3-border-grey">
            <div className="w3-col" style={{width: '60px'}}> <button className="w3-button w3-blue"> Submit </button> </div>
            <div className="w3-rest" style = {{textAlign: 'right'}}>
              { this.props.savedQuizs.indexOf(this.props.currentIndex) === -1 ?
                <button className="w3-button w3-text-orange" onClick={() => this.props.saveQuiz(this.props.currentIndex)}> Save Quiz </button>
                :
                <button className="w3-button w3-text-orange" onClick={() => this.props.unsaveQuiz(this.props.currentIndex)}> Unsave </button>
              }
              <button className="w3-button" onClick={this.props.previous} > 
                <i className="fa fa-arrow-left" /> <span className="w3-hide-small" > Back </span>
              </button>
              <button className="w3-button" onClick={this.props.next} > 
                <span className="w3-hide-small" > Next </span> <i className="fa fa-arrow-right" /> 
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
