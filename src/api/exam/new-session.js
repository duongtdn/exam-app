"use strict"

function response() {
  return function (req, res) {
    res.status(200).json({ session: 'created session' })
  }
}

module.exports = response