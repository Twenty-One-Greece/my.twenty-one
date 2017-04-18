const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// create a schema
const userSchema = new Schema({
    name:       { type: String,     required: true },
    username:   { type: String,     required: true, unique: true },
    company:    { type: String,     default: '' },
    email:      { type: String,     required: true },
    password:   { type: String,     required: true },
    country:    { type: String,     required: true },
    city:       { type: String,     required: true },
    telephone:  { type: Number,     required: true },
    created_at: Date,
    updated_at: Date
});


// On every save, add the date
userSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) this.created_at = currentDate
    next()
})


// Hash and salt password
userSchema.pre('save', function(next) {
    let user = this

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) console.log(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) console.log(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User