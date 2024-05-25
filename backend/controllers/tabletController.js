const { Tablets } = require("../models");
const multer = require("multer");
const db = require("../models");
const sizeOf = require("image-size");

const Tablet = db.tablets;

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("please upload ONLY images", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const getAllTablets = async (req, res) => {
    const listOfTablets = await Tablets.findAll();
    res.json(listOfTablets);
};

const uploadTablet = async (req, res) => {
    try {
        console.log(req.file);
        
        if (req.file === undefined) { return res.send("you must select a file") }
        
        const dimensions = sizeOf(req.file.path);
        
        Tablet.create({
            name: req.file.filename,
            path: req.file.path,
            status: "pending",
            height: dimensions.height,
            width: dimensions.width,
            annotations: []
        });
        
        return res.send("file has been updated");
    } catch (error) {
        console.log(error);
        return res.send("error when uploading images: " + error);
    }
};

const getTablet = async (req, res) => {
    const id = req.params.id;
    const tablet = await Tablets.findByPk(id);
    return res.json(tablet);
};

module.exports = {
    storage,
    imageFilter,
    getAllTablets,
    uploadTablet,
    getTablet
}