const mongoose = require("mongoose")

const PredictionSchema = new mongoose.Schema({
  city: {type:String, required:true,  lowercase:true,  default:''},
  state: {type:String, required:true, lowercase:true,  default:''},
  timeOfPrediction: {type:String, lowercase:true, required:true, default:''},
  forecasts: {type:Array, lowercase:true, required:true, default:[]}
})
module.exports = mongoose.model('PredictionSchema', PredictionSchema);
