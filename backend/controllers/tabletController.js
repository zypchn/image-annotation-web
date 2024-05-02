const Tablet = require("../models/tabletModel");
const multer = require("multer");
const sizeOf = require("image-size");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

// all tablets display page
const displayTablets = async (req, res) => {
    const tablets = await Tablet.find({})    // find all
    res.status(200).json(tablets)
}

// tablet label page
const getTablet = async (req, res) => {
    const {tabletName} = req.params;
    
    const tablet = await Tablet.findOne({tabletName: tabletName})
    
    if (!tablet) { return res.status(404).json({error: "no such tablet"}) }
    
    res.status(200).json(tablet);
    console.log("tablet " + tablet._id + " fetched");
}


// upload tablet page
const uploadTablet = async (req, res) => {
    
    const dimensions = sizeOf(req.file.path);
    
    await Tablet.create({
        tabletName: req.file.filename,
        tabletPath: req.file.path,
        status: "pending",
        width: dimensions.width,
        height: dimensions.height
    })
    .then(result => res.json(result))
    .catch(error => console.log(error));
}

module.exports = {
    displayTablets,
    getTablet,
    uploadTablet,
    storage
}