"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import AccountClient  from 'account-realm-client'
import { UserProvider } from 'react-user'

import ResultApp from '../src/client/Page/Result'

const acc = new AccountClient({
  realm: 'realm',
  app: 'dev',
  baseurl: 'http://localhost:3100'
})
acc.sso( (err,user) => {
  console.log(err)
  console.log(user)
})

const __data= {
  "urlBasePath":"/api",
  "data": {
    "resultId": "r-test-01",
    "title": "Embedded - 01: Final Exam",
    "description": "Final Test for course Embedded - 01",
    "startAt": 1559894402883,
    "assignedTo": ["awesome-dev"],
    "result": {
      "status": "passed",
      "createdAt": 1559894402883,
      "detail": {
        "totalScore":20,
        "sectionScores": [
          {"id":"sc1","score":20, "allScore":30},
          {"id":"sc2","score":0, "allScore":30}
        ]
      }
    },
    "content": {
      "sections": [
        {"id":"sc1","title":"Section 1","description":"Here is the section 1"},
        {"id":"sc2","title":"Section 2","description":"Here is the section 2"}
      ]
    }
  },
  template: {
    avata: {
      male: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100',
      female: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
    }
  }
}

render(
  <UserProvider accountClient = {acc} >
    <ResultApp urlBasePath = {__data.urlBasePath} data = {__data.data} template = {__data.template} />
  </UserProvider>,
  document.getElementById('root')
)
