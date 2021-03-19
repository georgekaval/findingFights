const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
  res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

  User.create(req.body, (err, createdUser) => {
    if (err){
      if(err.code===11000){
        red.send('user already exists!!')
      }
      else{
        res.send(err)
      }
    }
    else{
      res.send(createdUser)
    }
  })
})

module.exports = router
