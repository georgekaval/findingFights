const express = require('express')
const router = express.Router()

const Fight = require('../models/fights')

router.get('/', (req, res) => {
  Fight.find({}, (err, foundFights, next) => {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.render('ufc/index.ejs', {
        fights: foundFights, currentUser: req.session.currentUser
      })
    }
  })
})

router.get('/new', (req, res) => {
  res.render('ufc/new.ejs', {currentUser: req.session.currentUser})
})

router.get('/seed', (req, res) => {
  Fight.create([
    {
      name: 'UFC fight night 200',
      date: "2021-03-29T20:00:00",
      whereToWatch: 'ESPN +',
      fightList: ['Jon Jones vs Francis Ngannou']
    },
    {
      name: 'UFC fight night 201',
      date: "2021-04-07T10:08:07",
      whereToWatch: 'ESPN +',
      fightList: ['Stipe vs Derrick Lewis']
    }
  ], (err, data) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/ufc')
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
    res.render('ufc/show.ejs', {fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.delete('/:id', (req, res) => {
  Fight.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/ufc')
    }
  })
})

router.get('/:id/edit', (req, res) => {
  Fight.findById(req.params.id, (err, foundFight) => {
    res.render('ufc/edit.ejs', { fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.put('/:id', (req, res) => {
  Fight.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFight) => {
    res.redirect('/ufc')
  })
})

module.exports = router
