const express = require("express");
const { getAllTablets, uploadTablet, storage, imageFilter, getTablet, updateAnnots, getAssignedUsers, changeStatus, changeLock} = require("../controllers/tabletController");
const multer = require("multer");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


// protects API requests
router.use(requireAuth);

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

router.get("/", getAllTablets);

router.post("/upload", upload.single("image"), uploadTablet);

router.get("/:id", getTablet);

router.patch("/:id/annotations", updateAnnots);

router.get("/:id/assigned", getAssignedUsers);

router.patch("/:id/status", changeStatus);

router.patch("/:id/lock", changeLock);

module.exports = router;