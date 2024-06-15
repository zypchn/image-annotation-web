const db = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: "1d" });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { return res.status(400).send("All fields must be filled!"); }
        
        const user = await db.users.findOne({ where: {email} });
        if (!user) { return res.status(400).send("Incorrect email!"); }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) { return res.status(400).send("Incorrect password!"); }
        
        const token = createToken(user.id);
        
        return res.status(200).json({email, token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const signupUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password || !role) { return res.status(400).send("All fields must be filled!"); }
        
        if (!validator.isEmail(email)) { return res.status(400).send("Invalid Email!") }
        const userExists = await db.users.findOne({ where: {email} });
        if (userExists) { return res.status(400).send("Email already in use!") }
        
        if (!validator.isStrongPassword(password)) { return res.status(400).send("Password not strong enough!") }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await db.users.create({
            name,
            email,
            password: hash,
            role
        });
        
        const token = createToken(user.id);
        
        return res.status(200).json({email, token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    loginUser,
    signupUser
}