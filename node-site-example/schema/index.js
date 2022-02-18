//Import the mongoose module
const mongoose = require('mongoose');

const SuperHeroModel = require('../models/superhero.model')

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const hero = new SuperHeroModel({ name: 'WOLVERINE' });

hero.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

SuperHeroModel.create({ name: 'WOLVERINE' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
SuperHeroModel.insertMany([{ name: 'WOLVERINE' }], function(err) {
  if (err) return handleError(err);
});
SuperHeroModel.find({ name: 'WOLVERINE' }).where('createdDate').gt(oneYearAgo).exec(callback);
