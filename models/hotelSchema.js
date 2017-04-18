const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const hotelSchema = new Schema({
  title:        { type: String,   required: true },
  featured:     { type: Boolean,  default: false },
  description:  { type: String,   required: true },
  images:       { type: Array,    default: [] },
  userID:       { type: String,   required: true },
  created_at:   Date,
  updated_at:   Date
});

// on every save, add the date
hotelSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;