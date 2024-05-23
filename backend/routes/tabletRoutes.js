const express = require("express");
const router = express.Router();
const {getAllTablets, uploadTablet, storage, imageFilter, getTablet} = require("../controllers/tabletController");
const multer = require("multer");

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

router.get("/", getAllTablets);

router.post("/upload", upload.single("image"), uploadTablet);

router.get("/:id", getTablet);

module.exports = router;