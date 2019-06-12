"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import AccountClient  from 'account-realm-client'
import { UserProvider } from 'react-user'

import Exam from '../src/client/Page/Exam'

const acc = new AccountClient({
  realm: 'realm',
  app: 'dev',
  baseurl: 'http://localhost:3100'
})
acc.sso( (err,user) => {
  console.log(err)
  console.log(user)
})

render(
  <UserProvider accountClient = {acc} >
    <Exam urlBasePath = '/api' urlQuizzesBasePath = '/api/quizzes' />
  </UserProvider>,
  document.getElementById('root')
)
