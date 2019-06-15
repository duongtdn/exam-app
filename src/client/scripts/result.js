"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import AccountClient  from 'account-realm-client'
import { UserProvider } from 'react-user'

import ResultApp from '../Page/Result'

const acc = new AccountClient({
  realm: 'realm',
  app: 'dev',
  baseurl: __data.urlAccount
})
acc.sso()

render(
  <UserProvider accountClient = {acc} >
    <ResultApp urlBasePath = {__data.urlBasePath} data = {__data.data} template = {__data.template} />
  </UserProvider>,
  document.getElementById('root')
)
