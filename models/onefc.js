const mongoose = require('mongoose')
const {Schema, model} = mongoose

const onefcSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  whereToWatch: {type: String, required: true},
  fightList: {type: Array, required: true},
}, {timestamps: true})

const Onefc = model('Onefc', onefcSchema)

module.exports = Onefc
