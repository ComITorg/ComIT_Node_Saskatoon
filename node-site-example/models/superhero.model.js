const mongoose = require('mongoose');

const superHeroSchema = new Schema({
  movieCount: {
    type: Number,
    min: [0, 'Too few movies'],
    max: 12,
    required: [true, 'Why no movies?']
  },
  brand: {
    type: String,
    enum: ['Marvel', 'DC'],
    required: [true, 'It must belong to one of these 2 universes']
  }
});

const SuperHeroModel = mongoose.model('SuperHeroModel', superHeroSchema);