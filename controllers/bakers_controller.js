// dependencies
const express = require('express');
const bakerRouter = express.Router();
const Baker = require('../models/baker.js');
const bakerSeedData = require('../database/baker_seed.js');

// Index:
bakerRouter.get('/', (req, res) => {
  Baker.find()
    .populate('breads')
    .then(foundBakers => {
      console.log(foundBakers, 'line 11');
      res.send(foundBakers);
    })
    .catch(err => console.log(err));
});

// Show:
bakerRouter.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
    .populate('breads')
    .then(foundBaker => {
      console.log(foundBaker, 'line 23');
      res.render('bakerShow', {
        baker: foundBaker
      });
    })
    .catch(err => console.log(err));
});

bakerRouter.get('/data/seed', (req, res) => {
  Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
    .catch(err => console.log(err));
});

// export
module.exports = bakerRouter;
