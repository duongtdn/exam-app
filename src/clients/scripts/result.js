"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import Result from '../Page/Result'

render(<Result urlBasePath = {__data.urlBasePath} data = {__data.data} />, document.getElementById('root'))
