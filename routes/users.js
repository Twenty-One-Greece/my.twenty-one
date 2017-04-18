const express = require('express')
const router = express.Router()
const User = require('../models/userSchema.js')


router.post('/register', (req, res) => {
    const data = req.body
    const newUser = new User(data)

    newUser.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New user created" })
    })
})

router.post('/login', (req, res) => {
    const data = req.body
    User.findOne({ username: data.username }, (err, user) => {

        if (user) user.comparePassword(data.password, function(err, isMatch) {
            if (err) return res.send(err)
            if (isMatch) return res.send(user)
            return res.send({ err: true, message: 'Wrong password' })
        })

        else return res.send({ err: true, message: 'No user found' })
    })
})

module.exports = router;