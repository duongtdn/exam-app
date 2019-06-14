"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import AccountClient  from 'account-realm-client'
import { UserProvider } from 'react-user'

import ExamApp from '../Page/Exam'

const acc = new AccountClient({
  realm: 'realm',
  app: 'dev',
  baseurl: __data.urlAccount
})
acc.sso()

render(
  <UserProvider accountClient = {acc} >
    <ExamApp urlBasePath = {__data.urlBasePath} urlQuizzesBasePath = {__data.urlQuizzesBasePath} template = {__data.template} />
  </UserProvider>,
  document.getElementById('root')
)
