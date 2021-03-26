const mongoose = require('mongoose')
const {Schema, model} = mongoose

const ufcSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  whereToWatch: {type: String, required: true},
  location: {type: String, required: true},
  fightList: {type: Array, required: true},
}, {timestamps: true})

const UFC = model('UFC', ufcSchema)

module.exports = UFC
