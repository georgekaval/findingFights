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

router.get('/new', (req, res) => {
  res.render('new.ejs')
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

router.post('/', (req, res) => {
  Fight.create(req.body, (error, createdFight) => {
    if (error) {
      console.log(error)
      res.send(error)
    }
    else {
      res.redirect('/ufc')
    }
  })
})

router.get('/:id', (req, res) => {
  Fight.findById(req.params.id, (err, foundFight) => {
    res.render('show.ejs', {fight: foundFight})
  })
})
module.exports = router
