const Tablet = require("../models/tabletModel");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// all tablets display page
const displayTablets = async (req, res) => {
    const tablets = await Tablet.find({})    // find all
    res.status(200).json(tablets)
}

// tablet label page
const labelTablet = async = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).json({error: "invalid id"}) }
    
    /*
    const tablet = await Tablet.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    
    if (!tablet) { return res.status(404).json({error: "tablet not found"}) }
    
    res.status(200).json(tablet);
     */
}


// upload tablet page
const uploadTablet = async (req, res) => {
    
    await Tablet.create({
        tabletName: req.file.filename,
        tabletPath: req.file.path
    })
    .then(result => res.json(result))
    .catch(error => console.log(error));
}

module.exports = {
    displayTablets,
    labelTablet,
    uploadTablet,
    storage
}