const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const serviceSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, default: '' },
    category: { type: Array, default: [] },
    product: { type: String, default: '' },
    price: { type: Number, default: 0 },
    offer: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    schedule: { type: Array, default: [] },

    departureDays: { type: Array, default: [] },

    from: { type: String, default: '' },
    to: { type: String, default: '' },

    langitude: { type: String, default: '' },
    longitude: { type: String, default: '' },

    includes: { type: String, default: '' },
    notIncludes: { type: String, default: '' },

    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },

    providerName: { type: String, default: '' },
    destination: { type: String, default: '' },
    destinationOtagID: { type: String, default: '' },

    measurementUnit: { type: String, default: '' },
    duration: { type: String, default: '' },
    tourLanguage: { type: Array, default: [] },

    description: { type: String, default: '' },
    images: { type: Array, default: [] },
    userID: { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
serviceSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;