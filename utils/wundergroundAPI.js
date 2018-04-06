
const moment = require('moment')
const Wunderground = require('node-weatherunderground')
const Promise = require('bluebird')
const Prediction = require('../models/Prediction')
const mongoose = require('mongoose')
module.exports = {
  get: (params) => {
    console.log("in utils")
    return new Promise((resolve, reject) =>{
      var client = new Wunderground()
      var currentTime = moment().format('YYYY-MM-DD-HH')
      var forecasts = []
      client.hourly10day(params, (err, data) => {
        if (err){
          throw err
          return
        }
        // parse data
        for (var i=0; i < data.length; i++){
          var month = (data[i].FCTTIME.mon_padded);
          var day = (data[i].FCTTIME.mday_padded );
          var year = (data[i].FCTTIME.year);
          var hour = (data[i].FCTTIME.hour_padded);
          var dateString = year + '-' + month + '-' + day + '-' + hour;
          var end = moment(dateString, 'YYYY-MM-DD-HH').format('YYYY-MM-DD-HH');

          // build model
          var forecast = {
            timeOfFruition: end,
            temp: data[i].temp.english,
            condition: data[i].condition
          }
          forecasts.push(forecast)
        }
        var prediction = {
          city: params.city,
          state: params.state,
          timeOfPrediction: currentTime,
          forecasts: forecasts
        }
        mongoose.connect(process.env.MONGODB_URI, function(err, res){
          if (err){
            console.log('DB CONNECTION FAILED: '+err)
            return;
          }
          Prediction.create(prediction, (err, prediction) => {
            if (err){
              console.log('couldnt create')
              reject(err)
              return
            }
            resolve(prediction)
          })
        })
      })
    })
  }
}
