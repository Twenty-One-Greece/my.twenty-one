const express = require('express')
const router = express.Router()
const fs = require('fs')
const Service = require('../models/serviceSchema')
const multer = require('multer')
const randomstring = require("randomstring")
const config = require("../config.js")
const Service_Img_Dir = config.SERVICE_IMG_DIR

// Multer settings for image uploads
// Used in /new-image/:destinationID route
const storage = multer.diskStorage({
    destination: Service_Img_Dir,
    filename: (req, file, cb) => {
        const name = randomstring.generate(7) + "-" + file.originalname
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

// New Service
router.post('/new', (req, res) => {
    const data = req.body
    const newService = new Service(data)

    newService.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New Service created" })
    })
})

// Get All Services
router.get('/all/:userID', (req, res) => {
    Service.find({ userID: req.params.userID }, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get One Service
router.get('/one/:serviceID', (req, res) => {
    Service.findOne({ _id: req.params.serviceID }, (err, service) => {
        if (err) return res.send(err)
        return res.send(service)
    })
})

// Delete One Service
router.delete('/one/:serviceID', (req, res) => {
    Service.findByIdAndRemove(req.params.serviceID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Service Deleted" })
    })
})

// Add new image to Service
router.post('/new-image/:serviceID', upload.single('image'), (req, res) => {
    Service.findByIdAndUpdate(
        req.params.serviceID, { $push: { images: { fileName: req.file.filename } } },
        (err, services) => {
            if (err) return res.send(err)
            return res.send({ message: 'New Image Added' })
        })
})

// Delete One Image from images Array
router.delete('/one-image/:serviceID/:fileName', (req, res) => {
    Service.findByIdAndUpdate(
        req.params.serviceID, { $pull: { images: { fileName: req.params.fileName } } },
        (err) => {
            if (err) return res.send(err)
            fs.unlink(Service_Img_Dir + req.params.fileName) // Remove image file
            return res.send({ message: "Service Image Deleted" })
        })
})

// Update Service by ID
router.post('/update/:serviceID', (req, res) => {
    const data = req.body

    Service.findOneAndUpdate({ _id: req.params.serviceID }, data, (err, service) => {
        if (err) return res.send(err)
        return res.send({ message: "Service Updated" })
    })
})

// Update Service by ID
router.post('/update-featured-image/:serviceID', (req, res) => {
    const data = req.body

    Service.findById(req.params.serviceID, (err, service) => {
        if (err) return res.send(err)
        service.featuredImage = data.featuredImage || service.featuredImage
        service.save((err, service) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Service Updated" })
    })
})

module.exports = router;