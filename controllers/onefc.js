const express = require('express')
const router = express.Router()

const Onefc = require('../models/onefc')

router.get('/', (req, res) => {
  Onefc.find({}, (err, foundFights, next) => {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.render('onefc/index.ejs', {
        fights: foundFights, currentUser: req.session.currentUser
      })
    }
  })
})

router.get('/new', (req, res) => {
  res.render('onefc/new.ejs', {currentUser: req.session.currentUser})
})

router.get('/seed', (req, res) => {
  Onefc.create([
    {
      name: 'One FC fight night 200',
      date: "2021-03-29T20:00:00",
      whereToWatch: 'ESPN +',
      fightList: ['Jon Jones vs Francis Ngannou']
    },
    {
      name: 'One FC fight night 201',
      date: "2021-04-07T10:08:07",
      whereToWatch: 'ESPN +',
      fightList: ['Stipe vs Derrick Lewis']
    }
  ], (err, data) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/onefc')
  })
})

router.post('/', (req, res) => {
  Onefc.create(req.body, (error, createdFight) => {
    if (error) {
      console.log(error)
      res.send(error)
    }
    else {
      res.redirect('/onefc')
    }
  })
})

router.get('/:id', (req, res) => {
  Onefc.findById(req.params.id, (err, foundFight) => {
    res.render('onefc/show.ejs', {fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.delete('/:id', (req, res) => {
  Onefc.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/onefc')
    }
  })
})

router.get('/:id/edit', (req, res) => {
  Onefc.findById(req.params.id, (err, foundFight) => {
    res.render('onefc/edit.ejs', { fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.put('/:id', (req, res) => {
  Onefc.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFight) => {
    res.redirect('/onefc')
  })
})

module.exports = router
