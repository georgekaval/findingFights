const express = require('express')
const router = express.Router()

const Fight = require('../models/ufc')

router.get('/', (req, res) => {
  Fight.find({}, (err, foundFights, next) => {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.render('index.ejs', {
        fights: foundFights,
      })
    }
  })
})

router.get('/seed', (req, res) => {
  Fight.create([
    {
      name: 'UFC fight night 200',
      date: 03/29/2021,
      time: '8:00 PM',
      whereToWatch: 'ESPN +',
      fightList: ['Jon Jones vs Francis Ngannou']
    },
    {
      name: 'UFC fight night 201',
      date: 04/07/2021,
      time: '8:00 PM',
      whereToWatch: 'ESPN +',
      fightList: ['Stipe vs Derrick Lewis']
    }
  ], (err, data) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

module.exports = router
