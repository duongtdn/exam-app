"use strict"

import React, { Component } from 'react'

import UserNotSignedIn from './UserNotSignedIn'

import { formatDate } from '../lib/date'

class Result extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.data)
    return(
      <div >
        <div className="w3-container">
          <h3 className="w3-text-blue"> <i className="fa fa-calendar" /> Test Result Report </h3>
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
    const user = this.props.user
    const tag = `w3-tag ${test.result.status==='passed'?'w3-green':'w3-red'}`
    return (
      <div>
        <h4 style={{fontWeight: 'bold'}}>
          <img className="w3-circle"style={{width: '40px'}} src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100" />
          {' '} {user.profile.fullName}
        </h4>

        <div style={{margin: '24px 0'}}>
          <p className="w3-text-blue-grey w3-small w3-border-bottom"> Result Overview </p>
          <p>
            <span className="w3-text-blue w3-large"> {test.title} </span> <br />
            <span className="w3-text-grey" style={{fontStyle: 'italic'}}> {test.description} </span>
          </p>
          <table className="w3-table">
            <tbody>
              <tr>
                <td className="w3-text-grey"> Taken at </td>
                <td> {formatDate(new Date(test.startAt))} </td>
              </tr>
              <tr>
                <td className="w3-text-grey"> Result </td>
                <td> <span className={tag}> {test.result.status.toUpperCase()} </span> </td>
              </tr>
              <tr>
                <td className="w3-text-grey"> Total Score </td>
                <td> <span > {test.result.detail.totalScore} </span> {' '} pt. </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{margin: '24px 0'}}>
          <p className="w3-text-blue-grey w3-small w3-border-bottom"> Result Detail </p>
          <table className="w3-table">
            <tbody className="">{
              test.content.sections.map(section => {
                const result = test.result.detail.sectionScores.filter(s => s.id === section.id)[0]
                return (
                  <tr className="w3-border-bottom" key={section.id}>
                    <td>
                      <span> {section.title} </span> <br/>
                      <span className="w3-text-grey w3-small"> {section.description} </span>
                    </td>
                    <td>
                      <span className="w3-text-blue-grey" style={{fontWeight: 'bold'}}>
                        {result.score}
                      </span>
                      /
                      <span className="w3-text-grey w3-small" style={{fontWeight: 'bold'}}>
                        {result.points}
                      </span>
                      <span className="w3-text-grey" >
                        {' '} pt.
                      </span>
                    </td>
                  </tr>
                )
              })
            }</tbody>
          </table>
        </div>

        <footer style={{margin: '64px 0'}}>

        </footer>

      </div>
    )
  }
}


export default class ResultApp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.user === null) {
      return ( null )
    }
    if (this.props.user === undefined) {
      return ( <UserNotSignedIn /> )
    }
    return (
      <Result urlBasePath = {this.props.urlBasePath}
              data = {this.props.data}
              user = {this.props.user}
              accountClient = {this.props.accountClient}
      />
    )
  }
}
