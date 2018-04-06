'use strict';

module.exports.hello = (event, context, callback) => {
  let min = 0;
  let max = 10;
  let randomNumber = Math.floor(Math.random()* max) + min

  callback(null, randomNumber)
};
