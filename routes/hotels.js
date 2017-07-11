const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotelSchema')
const multer = require('multer')
const randomstring = require("randomstring");
const fs = require('fs')
const config = require("../config.js")
const Hotels_Img_Dir = config.HOTELS_IMG_DIR

// Multer settings for image uploads
// Used in /new-image/:hotelID route
const storage = multer.diskStorage({
    destination: Hotels_Img_Dir,
    filename: (req, file, cb) => {
        const name = randomstring.generate(7) + "-" + file.originalname
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

// Create New Hotel
router.post('/new', (req, res) => {
    const data = req.body
    const newHotel = new Hotel(data)

    newHotel.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New Hotel created" })
    })
})

// Get All Hotels
router.get('/all/:userID', (req, res) => {
    Hotel.find({ userID: req.params.userID }, (err, hotels) => {
        if (err) return res.send(err)
        return res.send(hotels)
    })
})

// Get One Hotel
router.get('/one/:hotelID', (req, res) => {
    Hotel.findOne({ _id: req.params.hotelID }, (err, hotel) => {
        if (err) return res.send(err)
        return res.send(hotel)
    })
})


// Delete One Hotel
router.delete('/one/:hotelID', (req, res) => {
    Hotel.findByIdAndRemove(req.params.hotelID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Hotel Deleted" })
    })
})


// Update Hotel by ID
router.post('/update/:hotelID', (req, res) => {
    const data = req.body

    Hotel.findById(req.params.hotelID, (err, hotel) => {
        if (err) return res.send(err)

        hotel.title = data.title || hotel.title
        hotel.description = data.description || hotel.description
        hotel.featured = data.featured || false

        hotel.save((err, hotel) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Hotel Updated" })
    })
})

// Add new image to hotel
router.post('/new-image/:hotelID', upload.single('image'), (req, res) => {
    Hotel.findByIdAndUpdate(
        req.params.hotelID, { $push: { images: { fileName: req.file.filename } } },

        (err, hotel) => {
            if (err) return res.send(err)
            return res.send({ message: 'New Image Added' })
        })
})

// Delete One Image from images Array
router.delete('/one-image/:hotelID/:fileName', (req, res) => {
    Hotel.findByIdAndUpdate(
        req.params.hotelID,
        { $pull: { images: { fileName: req.params.fileName } } },
        (err) => {
            if (err) return res.send(err)
            fs.unlink(Hotels_Img_Dir + req.params.fileName)        // Remove image file
            return res.send({ message: "Hotel Image Deleted" })
        })
})

router.post('/update-featured-image/:hotelID', (req, res) => {
    const data = req.body

    Hotel.findById(req.params.hotelID, (err, hotel) => {
        if (err) return res.send(err)
        hotel.featuredImage = data.featuredImage || hotel.featuredImage
        hotel.save((err, hotel) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Hotel Updated" })
    })
})


module.exports = router;