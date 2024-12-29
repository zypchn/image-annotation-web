const { loginUser, signupUser, getUser, getAllStudents, assignTablet, getAssignedTablets, verifyOTP,
    removeTabletFromUser
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/assign", assignTablet);

router.get("/:id/assigned", getAssignedTablets);

router.get("/students", getAllStudents);

router.get("/:id", getUser);

router.post("/verifyOTP", verifyOTP);

router.post("/removeAssignation", removeTabletFromUser);

module.exports = router;