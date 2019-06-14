"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import AccountClient  from 'account-realm-client'
import { UserProvider } from 'react-user'

import ExamApp from '../src/client/Page/Exam'

const template = {
  avata: {
    male: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100',
    female: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
  }
}

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
    <ExamApp urlBasePath = '/api' urlQuizzesBasePath = '/api/quizzes'  template = {template}  />
  </UserProvider>,
  document.getElementById('root')
)
