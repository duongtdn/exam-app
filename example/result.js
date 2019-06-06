"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import Result from '../src/client/Page/Result'

const __data= {
  "urlBasePath":"/api",
  "data": {
    "resultId": "r-test-01",
    "title": "Embedded - 01: Final Exam",
    "description": "Final Test for course Embedded - 01",
    "assignedTo": ["awesome-dev"],
    "result": {
      "status": "passed",
      "createdAt": "2019-06-06T23:28:45.729Z",
      "detail": {
        "totalScore":20,
        "sectionScores": [
          {"id":"sc1","score":20},
          {"id":"sc2","score":0}
        ]
      }
    },
    "content": {
      "sections": [
        {"id":"sc1","title":"Section 1","description":"Here is the section 1"},
        {"id":"sc2","title":"Section 2","description":"Here is the section 2"}
      ]
    }
  }
}

render(<Result urlBasePath = {__data.urlBasePath} data = {__data.data} />, document.getElementById('root'))
