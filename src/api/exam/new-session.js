"use strict"

function authen() {
  return function(req, res, next) {
    next()
  }
}

function checkRegister() {
  return function(req, res, next) {
    next()
  }
}

function getExamStructure() {
  return function(req, res, next) {
    next()
  }
}

function createTest() {
  return function(req, res, next) {
    next()
  }
}

function signSessionToken() {
  return function(req, res, next) {
    next()
  }
}

function response() {
  return function (req, res) {
    res.status(200).json({ session: 'created session' })
  }
}

module.exports = [authen, checkRegister, getExamStructure, createTest, signSessionToken, response]