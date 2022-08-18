const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');
const seedValues = require('../database/seed');

// INDEX
breads.get('/', (req, res) => {
  // Bread.getRachel()
  //   .then(foundRachel => {
  //     console.log(foundRachel);
  //   })
  //   .catch(err => console.log(err));
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

// SEED
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedValues)
    .then(seededBreads => {
      res.redirect('/breads');
    })
    .catch(err => {
      console.log(err);
      res.render('Error');
    });
})

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
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('Edit', {
        bread: foundBread,
      });
    })
    .catch(err => console.log(err));
});

// UPDATE
breads.put('/:id', (req, res) => {
  console.log(req.params.id, req.body, 'line 62');
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true';
  } else {
    req.body.hasGluten = 'false';
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      res.redirect(`/breads/${req.params.id}`);
    })
    .catch(err => console.log(err));
});

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      res.status(303).redirect('/breads');
    })
    .catch(err => console.log(err));
});

module.exports = breads;
