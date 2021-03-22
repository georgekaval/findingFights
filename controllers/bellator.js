const express = require('express')
const router = express.Router()

const Fight = require('../models/fights')

router.get('/', (req, res) => {
  Fight.find({}, (err, foundFights, next) => {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.render('index.ejs', {
        fights: foundFights, currentUser: req.session.currentUser
      })
    }
  })
})

router.get('/new', (req, res) => {
  res.render('new.ejs', {currentUser: req.session.currentUser})
})

router.get('/seed', (req, res) => {
  Fight.create([
    {
      name: 'Bellator fight night 200',
      date: "2021-03-29T20:00:00",
      whereToWatch: 'ESPN +',
      fightList: ['Jon Jones vs Francis Ngannou']
    },
    {
      name: 'Bellator fight night 201',
      date: "2021-04-07T10:08:07",
      whereToWatch: 'ESPN +',
      fightList: ['Stipe vs Derrick Lewis']
    }
  ], (err, data) => {
    if(err) {
      console.log(err)
    }
    res.redirect('bellator')
  })
})

router.post('/', (req, res) => {
  Fight.create(req.body, (error, createdFight) => {
    if (error) {
      console.log(error)
      res.send(error)
    }
    else {
      res.redirect('/bellator')
    }
  })
})

router.get('/:id', (req, res) => {
  Fight.findById(req.params.id, (err, foundFight) => {
    res.render('show.ejs', {fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.delete('/:id', (req, res) => {
  Fight.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/bellator')
    }
  })
})

router.get('/:id/edit', (req, res) => {
  Fight.findById(req.params.id, (err, foundFight) => {
    res.render('edit.ejs', { fight: foundFight, currentUser: req.session.currentUser})
  })
})

router.put('/:id', (req, res) => {
  Fight.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFight) => {
    res.redirect('/bellator')
  })
})

module.exports = router
