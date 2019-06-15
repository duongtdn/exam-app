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
  "resultId": "r-test-01",
  "template": {
    "avata": {
      "male": 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100',
      "female": 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
    }
  }
}

render(
  <UserProvider accountClient = {acc} >
    <ResultApp urlBasePath = {__data.urlBasePath} template = {__data.template} resultId = {__data.resultId} />
  </UserProvider>,
  document.getElementById('root')
)
