"use strict"

const path = require("path");

module.exports = {
  entry: {
    exam: ['./src/clients/scripts/exam.js']
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',    
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map'
}