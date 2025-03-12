const express = require("express");
const { getAnnots, updateAnnots, deleteAnnot} = require("../controllers/annotController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// protects API requests
router.use(requireAuth);

router.get("/:id", getAnnots);

router.patch("/:id", updateAnnots);

router.delete("/:id", deleteAnnot);

module.exports = router;