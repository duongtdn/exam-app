# exam-app

## Install

`npm install exam-app`

## Developers

1- Start an account-realm server first

ex: `cd ~/work/account-realm-core && node tests/server`

2- Start exam-app/server

`npm start`

3- Start webpack dev server

`npm run dev`

4- Create a Test for test user

`node example/create-test`

5- Copy the test session key, Open browser and enter below address

`http://localhost:3200/exam?t=created-session-key`

## Integration

### Build Client Scripts

`npm run build`

Then, deploy `exam.js` and `result.js` into a CDN. Remenber to configure `URL` to `environment parameter`

### Create API Server

Example code below demonstrate how to create a server using exam-app

```javascript
" use strict"

// get the api
const api = require('exam-app')

// add database driver into helpers
api.helpers({ Collections: require('./database-driver') })

// create server using api
const express = require('express')
const app = express()

app.use('/', api.generate())

const PORT = 3400
app.listen(PORT, (err) => {
  if (err) {
    console.log('Failed to start API Server')
  } else {
    console.log(`EXAM: API Server is running at port ${PORT}`)
  }
})

```

### Configure enviroment parameter

The following `environment parameter` must be set

```
CDN=url-to-the-location-of-client-js-files
URL_BASE_PATH=this-one-is-empty-when-deploy
URL_QUIZZES_BASE_PATH=url-to-the-location-of-quizzes
URL_ACCOUNT=url-of-account-realm-server
DEFAULT_AVATA_MALE=url-where-the-default-male-pciture-is-located
DEFAULT_AVATA_FEMALE=url-where-the-default-female-pciture-is-located

PRIVATE_AUTH_KEY=key-to-authen-realm-with-account-server
PRIVATE_SESSION_KEY=key-to-encode-session
PRIVATE_TEST_KEY=key-to-encode-test
SHARE_AUTH_KEY=share-auth-key-between-apps-to-allow-api-invoke
```
