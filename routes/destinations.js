const express = require('express')
const router = express.Router()
const Destination = require('../models/destinationSchema')
const multer = require('multer')
const randomstring = require("randomstring");
const fs = require('fs')
const config = require("../config.js")
const Destinations_Img_Dir = config.DESTINATIONS_IMG_DIR


// Multer settings for image uploads
// Used in /new-image/:destinationID route
const storage = multer.diskStorage({
    destination: Destinations_Img_Dir,
    filename: (req, file, cb) => {
        const name = randomstring.generate(7) + "-" + file.originalname
        cb(null, name);
    }
});

const upload = multer({ storage: storage });


// Create New Destination
router.post('/new', (req, res) => {
    const data = req.body
    const newDestination = new Destination(data)

    newDestination.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New Destination created" })
    })
})

// Get All Destinations of a User
router.get('/all/:userID', (req, res) => {
    Destination.find({ userID: req.params.userID }, (err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get All Destination Names of a User
router.get('/all-names/:userID', (req, res) => {
    Destination.find({ userID: req.params.userID })
    .select('title')
    .exec((err, destinations) => {
        if (err) return res.send(err)
        return res.send(destinations)
    })
})

// Get One Destination
router.get('/one/:destinationID', (req, res) => {
    Destination.findOne({ _id: req.params.destinationID }, (err, destination) => {
        if (err) return res.send(err)
        return res.send(destination)
    })
})

// Get One Destination
router.delete('/one/:destinationID', (req, res) => {
    Destination.findByIdAndRemove(req.params.destinationID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Destination Deleted" })
    })
})

// Add new image to destination
router.post('/new-image/:destinationID', upload.single('image'), (req, res) => {
    Destination.findByIdAndUpdate(
        req.params.destinationID, { $push: { images: { fileName: req.file.filename } } },

        (err, destinations) => {
            if (err) return res.send(err)
            return res.send({ message: 'New Image Added' })
        })
})

// Delete One Image from images Array
router.delete('/one-image/:destinationID/:fileName', (req, res) => {
    Destination.findByIdAndUpdate(
        req.params.destinationID,
        { $pull: { images: { fileName: req.params.fileName } } },
        (err) => {
            if (err) return res.send(err)
            fs.unlink(Destinations_Img_Dir + req.params.fileName)        // Remove image file
            return res.send({ message: "Destination Image Deleted" })
        })
})

// Update Destination by ID
router.post('/update/:destinationID', (req, res) => {
    const data = req.body

    Destination.findById(req.params.destinationID, (err, destination) => {
        if (err) return res.send(err)

        destination.title         = data.title         || destination.title
        destination.description   = data.description   || destination.description
        destination.thingsToDo    = data.thingsToDo    || destination.thingsToDo
        destination.include       = data.include
        destination.featured      = data.featured      || false
        destination.featuredImage = data.featuredImage || destination.featuredImage

        destination.save((err, destination) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Destination Updated" })
    })
})


// Update Destination by ID
router.post('/update-featured-image/:destinationID', (req, res) => {
    const data = req.body

    Destination.findById(req.params.destinationID, (err, destination) => {
        if (err) return res.send(err)
        destination.featuredImage = data.featuredImage || destination.featuredImage
        destination.save((err, destination) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Destination Updated" })
    })
})
module.exports = router;