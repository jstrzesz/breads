// require mongoose
const mongoose = require('mongoose');
// create shorthand for the Schema constructor
const { Schema } = mongoose;

const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    type: String,
    enum: [ 'Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe' ],
  }
});

// helper methods
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`;
};

breadSchema.statics.getRachel = function() {
  return this.find({ baker: 'Rachel' });
};

const Bread = mongoose.model('Bread', breadSchema);

Bread.getRachel();

module.exports = Bread;
