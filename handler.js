'use strict';
require('dotenv').config()
const wunderAPI = require('./utils/wundergroundAPI')

module.exports.hello = (event, context, callback) => {
  console.log("running hello")
  // take city and state as params to get the weather
  wunderAPI.get({key: process.env.WUNDER_API_KEY, city: "philadelphia", state: "pa"})
  .then((result) => {
    console.log("done")
    callback(null, result)
  })
};
