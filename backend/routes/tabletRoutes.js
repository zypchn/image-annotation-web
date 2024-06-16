const express = require("express");
const {getAllTablets, uploadTablet, storage, imageFilter, getTablet, updateAnnots} = require("../controllers/tabletController");
const multer = require("multer");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
// protects API requests

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

router.get("/", getAllTablets);

router.post("/upload", upload.any("image"), uploadTablet);

router.get("/:id", getTablet);

router.patch("/:id", updateAnnots);

module.exports = router;