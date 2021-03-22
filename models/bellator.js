const mongoose = require('mongoose')
const {Schema, model} = mongoose

const bellatorSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  whereToWatch: {type: String, required: true},
  fightList: {type: Array, required: true},
}, {timestamps: true})

const Bellator = model('Bellator', bellatorSchema)

module.exports = Bellator
