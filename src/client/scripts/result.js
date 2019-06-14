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
acc.sso()

render(
  <UserProvider accountClient = {acc} >
    <ResultApp urlBasePath = {__data.urlBasePath} data = {__data.data} template = {__data.template} />
  </UserProvider>,
  document.getElementById('root')
)
