"use strict"

import React, { Component } from 'react'

export default class QuizBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="">
        <div className="w3-panel w3-padding w3-light-grey w3-border w3-border-grey">
          <div> 
            <label className="w3-text-grey w3-small"> Section 1: The title of section here </label>            
          </div>
          <label> Quiz 15 </label> <label className="w3-tag w3-green w3-small" style={{fontStyle: 'italic'}}> Answer Submitted </label>
          <label className="w3-right w3-text-blue-grey"> 20pt </label>
        </div>
        <div>
          <div>
            Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few immediate sweetness earnestly dejection. 

            Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors. 

            To sure calm much most long me mean. Able rent long in do we. Uncommonly no it announcing melancholy an in. Mirth learn it he given. Secure shy favour length all twenty denote. He felicity no an at packages answered opinions juvenile. 
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
              <button className="w3-button w3-text-orange"> Save Quiz </button>
              <button className="w3-button"> <i className="fa fa-arrow-left" /> </button>
              <button className="w3-button"> <i className="fa fa-arrow-right" /> </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
