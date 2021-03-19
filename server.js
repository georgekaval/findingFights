require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection
mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log("database connection checked")
})
db.on('error', (err) => {
  console.log('ERROR: ', err)
})
db.on('connected', () => {
  console.log('mongo connected')
})
db.on('disconnected', () => {
  console.log('mongo disconnected')
})
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitiaized: false,
}))
const ufcControllers = require('./controllers/ufc')
const usersControllers = require('./controllers/users')
const sessionsControllers = require('./controllers/sessions')
const bellatorControllers = require('./controllers/bellator')
const onefcControllers = require('./controllers/onefc')
app.use('/ufc', ufcControllers)
app.use('/users', usersControllers)
// app.use('/sessions', sessionsControllers)
// app.use('/bellator', bellatorControllers)
// app.use('/onefc', onefcControllers)

app.get('/', (req, res) => {
  res.render('home.ejs')
})
app.listen(PORT, () => {
  console.log('Server is listening!!!');
})
