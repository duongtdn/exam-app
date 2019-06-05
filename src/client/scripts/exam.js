"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import Exam from '../Page/Exam'

render(<Exam urlBasePath = {__data.urlBasePath} urlQuizzesBasePath = {__data.urlQuizzesBasePath} />, document.getElementById('root'))
