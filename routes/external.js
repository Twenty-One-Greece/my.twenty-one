const express = require('express')
const router = express.Router()
const Service = require('../models/serviceSchema')
const Destination = require('../models/destinationSchema')
const Hotel = require('../models/hotelSchema')
const config = require("../config.js")

// Get All Services
router.get('/services/:userID', (req, res) => {
    Service.find({ userID: req.params.userID }, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get All Destinations
router.get('/destinations/:userID', (req, res) => {
    Destination.find({ userID: req.params.userID }, (err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get All Hotels
router.get('/hotels/:userID', (req, res) => {
    Hotel.find({ userID: req.params.userID }, (err, hotels) => {
        if (err) return res.send(err)
        return res.send(hotels)
    })
})

// Get All Service Titles and IDs
router.get('/services-names/:userID', (req, res) => {
    Service.find({ userID: req.params.userID }, 'title', (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get All Destinations Titles and IDs
router.get('/destinations-names/:userID', (req, res) => {
    Destination.find({ userID: req.params.userID }, 'title', (err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get All Hotels Titles and IDs
router.get('/hotels-names/:userID', (req, res) => {
    Hotel.find({ userID: req.params.userID }, 'title', (err, hotels) => {
        if (err) return res.send(err)
        return res.send(hotels)
    })
})

// Get One Service info
router.get('/service-one/:serviceID', (req, res) => {
    Service.findById(req.params.serviceID, (err, service) => {
        if (err) return res.send(err)
        return res.send(service)
    })
})

// Get One Destination info
router.get('/destination-one/:destinationID', (req, res) => {
    Destination.findById(req.params.destinationID, (err, destination) => {
        if (err) return res.send(err)
        return res.send(destination)
    })
})

// Get One Hotel info
router.get('/hotel-one/:hotelID', (req, res) => {
    Hotel.findById(req.params.hotelID, (err, hotel) => {
        if (err) return res.send(err)
        return res.send(hotel)
    })
})

// Get All Services by Category
router.get('/services/:userID/:serviceCategory', (req, res) => {
    Service.find({ category: req.params.serviceCategory, userID: req.params.userID }, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get All Services by Product
router.get('/services-product/:userID/:product', (req, res) => {
    Service.find({ product: req.params.product, userID: req.params.userID }, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get All Featured Services by Product
router.get('/services-product-featured/:userID/:product', (req, res) => {
    Service.find({ featured: true, product: req.params.product, userID: req.params.userID },
        (err, services) => {
            if (err) return res.send(err)
            return res.send(services)
        })
})

// Get All Featured Destinations
router.get('/destinations-featured/:userID', (req, res) => {
    Destination.find({ featured: true, userID: req.params.userID }, (err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get All Destinations Available for Website
router.get('/destinations-include/:userID', (req, res) => {
    Destination.find({ include: true, userID: req.params.userID }, (err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get All Services by Product, Destination (from / to),  Category
router.get('/services-destination-category/:userID/:product/:destination/:category', (req, res) => {
    Service.find({
            $and: [{ product: req.params.product }, { category: req.params.category }, { userID: req.params.userID }],
            $or: [{ from: req.params.destination }, { to: req.params.destination }]
        },
        (err, services) => {
            if (err) return res.send(err)
            return res.send(services)
        })
})

// Get All Destinations Available for Website
router.get('/services-offers/:userID', (req, res) => {
    Service.find({ offer: true, userID: req.params.userID }, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

module.exports = router;