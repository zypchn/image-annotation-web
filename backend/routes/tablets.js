const express = require("express");
const router = express.Router()
const {uploadTablet, displayTablets, getTablet} = require("../controllers/tabletController");
const multer = require("multer");
const {storage} = require("../controllers/tabletController");

const upload = multer({
    storage: storage
})

router.get("/", displayTablets);

router.get("/:tabletName", getTablet);

// router.patch("/:id", labelTablet);

router.post("/", upload.single("file", "fileName"), uploadTablet);

module.exports = router
