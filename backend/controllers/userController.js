const db = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginUser = async (req, res) => {
    res.json({msg: "LOGIN USER"});
};

const signupUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        
        if (!name || !email || !password || !role) { return res.status(400).send("All fields must be filled!"); }
        
        if (!validator.isEmail(email)) { return res.status(400).send("Invalid Email!") }
        
        if (!validator.isStrongPassword(password)) { return res.status(400).send("Password not strong enough!") }
        
        const userExists = await db.users.findOne({ where: {email} });
        if (userExists) { return res.status(400).send("Email already in use!") }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        await db.users.create({
            name,
            email,
            password: hash,
            role
        })
        return res.status(200).json({name, email});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    loginUser,
    signupUser
}