const express = require("express");
const router = express.Router()
const {uploadTablet, labelTablet, displayTablets} = require("../controllers/tabletController");
const multer = require("multer");
const {storage} = require("../controllers/tabletController");

const upload = multer({
    storage: storage
})

router.get("/", displayTablets);

router.patch("/:id", labelTablet);

router.post("/create", upload.single("file"), uploadTablet);

module.exports = router
