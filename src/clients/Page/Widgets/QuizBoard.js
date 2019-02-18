"use strict"

import React, { Component } from 'react'

export default class QuizBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const quiz = this.props.questions[this.props.currentIndex]
    return(
      <div className="">
        <div className="w3-panel w3-padding w3-light-grey w3-border w3-border-grey">
          <div> 
            <label className="w3-text-grey w3-small"> Section: {quiz.section + 1} </label>            
          </div>
          <label> Quiz {this.props.currentIndex + 1} </label> 
          <label className="w3-tag w3-green w3-small" style={{fontStyle: 'italic'}}> Answer Submitted </label>
          <label className="w3-right w3-text-blue-grey"> {quiz.score}pt </label>
        </div>
        <div>
          <div>
             {quiz.problem} 
          </div>
          <hr />          
          <div>
            <input className="w3-radio" type="radio" name="answer" value="good" />
            <label>It could be a good answer</label>
            <br />
            <input className="w3-radio" type="radio" name="answer" value="confuse" />
            <label>It is really confuse me</label>
            <br />
            <input className="w3-radio" type="radio" name="answer" value="wrong"  />
            <label>Absolutely wrong answer</label> 
            <br />
          </div>
          <hr />
          <div className="w3-row">
            <div className="w3-col" style={{width: '60px'}}> <button className="w3-button w3-blue"> Submit </button> </div>
            <div className="w3-rest" style = {{textAlign: 'right'}}>
              <button className="w3-button w3-text-orange" onClick={() => this.props.saveQuiz(this.props.currentIndex)}> Save Quiz </button>
              <button className="w3-button" onClick={this.props.previous} > <i className="fa fa-arrow-left" /> </button>
              <button className="w3-button" onClick={this.props.next} > <i className="fa fa-arrow-right" /> </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
