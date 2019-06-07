"use strict"

import React, { Component } from 'react'

import { formatDate } from '../lib/date'

export default class Result extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div >
        <div className="w3-container">
          <h3 className="w3-text-blue"> Test Result Report </h3>
          <hr />
          {
            this.props.data.result ? this._renderResult() : this._renderNoResult()
          }
        </div>
      </div>
    )
  }
  _renderNoResult() {
    return (
      <div>
        <p> Your test result is not ready yet. Please come back later </p>
      </div>
    )
  }
  _renderResult() {
    const test = this.props.data
    const tag = `w3-tag ${test.result.status==='passed'?'w3-green':'w3-red'}`
    return (
      <div>
        <h4 style={{fontWeight: 'bold'}}> {test.title} </h4>
        <div className="w3-text-grey"> {test.description} </div>

        <div style={{margin: '24px 0'}}>
          <p className="w3-text-blue-grey w3-small w3-border-bottom"> Result Overview </p>
          <p className="w3-text-blue"> Name of User Here </p>
          <table className="w3-table">
            <tbody>
              <tr>
                <td className="w3-text-grey"> Taken at </td>
                <td> {formatDate(new Date(test.takenAt))} </td>
              </tr>
              <tr>
                <td className="w3-text-grey"> Result </td>
                <td> <span className={tag}> {test.result.status.toUpperCase()} </span> </td>
              </tr>
              <tr>
                <td className="w3-text-grey"> Score </td>
                <td> <span > {test.result.detail.totalScore} </span> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{margin: '24px 0'}}>
          <p className="w3-text-blue-grey w3-small w3-border-bottom"> Result Detail </p>
          <p className="w3-text-grey" style={{fontStyle: 'italic'}}> Score for each section </p>
          <table className="w3-table">
            <tbody>{
              test.content.sections.map(section => {
                return (
                  <tr>
                    <td>
                      <span> {section.title} </span> <br/>
                      <span className="w3-text-grey w3-small"> {section.description} </span>
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                )
              })
            }</tbody>
          </table>
        </div>

      </div>
    )
  }
}
