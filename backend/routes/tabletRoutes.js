const express = require("express");
const { getAllTablets, uploadTablet, storage, imageFilter, getTablet, updateAnnots, getAssignedUsers, changeStatus, changeLock,
    changeCustomID, checkLock
} = require("../controllers/tabletController");
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

router.get("/:id/assigned", getAssignedUsers);

router.patch("/:id/status", changeStatus);

router.patch("/:id/lock", changeLock);

router.patch("/:id/customID", changeCustomID);

router.get("/:id/checkLock", checkLock)

module.exports = router;