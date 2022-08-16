const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('Index', {
        breads: foundBreads,
        title: 'Index Page',
      });
    })
    .catch(err => {
      console.log(err);
      res.render('Error');
    });
});

// NEW
breads.get('/new', (req, res) => {
  res.render('new');
});

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('Show', {
        bread: foundBread,
      });
    })
    .catch(err => {
      res.render('Error');
    });
});

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true';
  } else {
    req.body.hasGluten = 'false';
  }
  Bread.create(req.body);
  res.redirect('/breads');
});

// EDIT
breads.get('/:arrayIndex/edit', (req, res) => {
  res.render('Edit', {
    bread: Bread[req.params.arrayIndex],
    index: req.params.arrayIndex,
  });
});

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true';
  } else {
    req.body.hasGluten = 'false';
  }
  Bread[req.params.arrayIndex] = req.body;
  res.redirect(`/breads/${req.params.arrayIndex}`);
});

// DELETE
breads.delete('/:arrayIndex', (req, res) => {
  Bread.splice(req.params.arrayIndex, 1);
  res.status(303).redirect('/breads');
})

module.exports = breads;
