const { loginUser, signupUser, getUser} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/:id", getUser);

module.exports = router;