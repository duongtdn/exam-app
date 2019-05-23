"use strict"

import React, { Component } from 'react'

import Quiz from 'react-quiz'
import addons from 'react-quiz/dist/addons'

export default class QuizBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const tests = this.props.tests
    const quiz = tests.content.questions[this.props.currentIndex]
    const section = tests.content.sections.findIndex( _section => _section.id === quiz.section)
    return(
      <div className="">
        <div className="w3-panel w3-padding w3-light-grey w3-border w3-border-grey">
          <div className="w3-" style={{display: 'inline-block'}} >
            <div> 
              <label className="w3-text-grey w3-small"> Section: {section + 1} </label>            
            </div>
            <label> Quiz {this.props.currentIndex + 1} </label> 
            {
              this.props.submittedQuizzes.indexOf(this.props.currentIndex) !== -1 ?
                <label className="w3-tag w3-green w3-small" style={{fontStyle: 'italic'}}> Submitted </label>
                : null
            }
            { this.props.pinnedQuizzes.indexOf(this.props.currentIndex) !== -1 ?
                <label className="w3-tag w3-blue w3-small" style={{fontStyle: 'italic'}}> Pinned </label>
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
          <div className="w3-cell-row w3-panel w3-padding w3-border-top w3-border-grey">
            <div className="w3-cell" > 
              <button className="w3-button w3-blue" onClick={this.props.submitAnswers} disabled={this.props.lockSubmitBtn}> Submit </button>
              {' '}
              { this.props.pinnedQuizzes.indexOf(this.props.currentIndex) === -1 ?
                <button className="w3-button w3-text-orange" onClick={() => this.props.pinQuiz(this.props.currentIndex)}> Pin this question </button>
                :
                <button className="w3-button w3-text-orange" onClick={() => this.props.unpinQuiz(this.props.currentIndex)}> Unpin </button>
              }
            </div>
            <div className="w3-cell" style = {{textAlign: 'right'}}>
              <button className="w3-button" onClick={this.props.previous} disabled = {this.props.lockBackBtn}>
                <i className="fa fa-arrow-left" /> <span className="w3-hide-small" > Back </span>
              </button>
              <button className="w3-button" onClick={this.props.next} disabled = {this.props.lockNextBtn}>
                <span className="w3-hide-small" > Next </span> <i className="fa fa-arrow-right" /> 
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
