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
      res.send(foundBakers);
    })
    .catch(err => console.log(err));
});

// Show:
bakerRouter.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
    .populate({
      path: 'breads',
      options: { limit: 3 }
    })
    .then(foundBaker => {
      res.render('bakerShow', {
        baker: foundBaker
      });
    })
    .catch(err => console.log(err));
});

// Delete:
bakerRouter.delete('/:id', (req, res) => {
  Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker => {
      res.status(303).redirect('/breads');
    })
    .catch(err => console.error(err));
});

bakerRouter.get('/data/seed', (req, res) => {
  Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
    .catch(err => console.log(err));
});

// export
module.exports = bakerRouter;
