const express = require("express");
const router = express.Router()
const {uploadTablet, labelTablet, displayTablets} = require("../controllers/tabletController");

router.get("/", displayTablets);

router.patch("/:id", labelTablet);

router.post("/create", uploadTablet);

module.exports = router
