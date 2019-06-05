"use strict"

function is(type) {
  return (o) => Object.prototype.toString.call(o) === `[object ${type}]`
}

module.exports = { is }