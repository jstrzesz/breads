// dependencies
const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');
const Baker = require('../models/baker.js');
const seedValues = require('../database/seed');

// INDEX
breads.get('/', async (req, res) => {
  try {
    const foundBakers = await Baker.find().lean();
    const foundBreads = await Bread.find().lean();
    res.render('Index.jsx', {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page',
    });
  } catch (e) {
    console.error(e);
    res.render('Error');
  }
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
  Baker.find()
    .then(foundBakers => {
      res.render('new', { bakers: foundBakers });
    })
    .catch(err => console.log(err));
});

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
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
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.id)
        .then(foundBread => {
          res.render('Edit', {
            bread: foundBread,
            bakers: foundBakers,
          });
        })
        .catch(err => console.log(err));
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
