"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import Exam from '../src/clients/Page/Exam'

render(<Exam urlBasePath = '/api' urlQuizzesBasePath = '/api/quizzes' />, document.getElementById('root'))
