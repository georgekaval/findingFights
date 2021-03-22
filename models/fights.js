const mongoose = require('mongoose')
const {Schema, model} = mongoose

const fightSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  whereToWatch: {type: String, required: true},
  fightList: {type: Array, required: true},
}, {timestamps: true})

const Fight = model('Fight', fightSchema)

module.exports = Fight
