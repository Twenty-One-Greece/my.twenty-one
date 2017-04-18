const express = require('express')
const router = express.Router()
const Service = require('../models/serviceSchema')
const Hotel = require('../models/hotelSchema')
const Destination = require('../models/destinationSchema')

const randomstring = require("randomstring")
const config = require("../config.js")



// Get All Counts. Only send object if counts are set.
router.get('/info/:userID', (req, res) => {
    var results = {}

    Service.count({ userID: req.params.userID }, (err, count) => {
        results.servicesCount = count
        if (Object.keys(results).length === 3) return res.send(results)
    })
    
    Hotel.count({ userID: req.params.userID }, (err, count) => {
        results.hotelsCount = count
        if (Object.keys(results).length === 3) return res.send(results)
    })

    Destination.count({ userID: req.params.userID }, (err, count) => {
        results.destinationsCount = count
        if (Object.keys(results).length === 3) return res.send(results)
    })
})

module.exports = router;