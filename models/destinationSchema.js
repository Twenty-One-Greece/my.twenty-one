const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const destinationsSchema = new Schema({
  title:        { type: String,   required: true },
  description:  { type: String,   required: true },
  thingsToDo:   { type: String,   default: '' },
  featured:     { type: Boolean,  default: false },
  include:      { type: Boolean,  default: true },
  city:         { type: String,   default: '' },
  images:       { type: Array,    default: [] },
  featuredImage:{ type: String, default: '' },
  userID:       { type: String,   required: true },
  created_at:   Date,
  updated_at:   Date
});

// on every save, add the date
destinationsSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Destination = mongoose.model('Destination', destinationsSchema);

module.exports = Destination;