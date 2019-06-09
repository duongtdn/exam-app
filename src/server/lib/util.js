"use strict"

function is(type) {
  return (o) => Object.prototype.toString.call(o) === `[object ${type}]`
}
const now = {
  timestamp() {
    return (() => new Date())().getTime()
  }
}

module.exports = { is, now }
