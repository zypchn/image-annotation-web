const db = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const {INTEGER} = require("sequelize");

const User = db.users;
const Tablet = db.tablets;
const UserTablet = db.usertablet;

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
        const userID = user.id;
        
        return res.status(200).json({email, userID, token});
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
        
        if (user.role === "Moderator") {
            const allTablets = await Tablet.findAll();
            await user.addTablet(allTablets, {through: "user_tablet"});
        }
        
        const token = createToken(user.id);
        const userID = user.id
        
        return res.status(200).json({email, token, userID});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    return res.status(200).json(user);
};

const getAllStudents = async (req, res) => {
    const role = "Student";
    const students = await User.findAll({where: {role}})
    return res.status(200).json(students)
};

const assignTablet = async (req, res) => {
    try {
        const { userID, tabletID } = req.body;
        const user = await User.findByPk(userID);
        const tablet = await Tablet.findByPk(tabletID);
        if (!user || !tablet) { return res.status(404).send("User or Tablet not found!"); }
        await user.addTablet(tablet, {through: "user_tablet"});
        return res.status(200).send("success");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const getAssignedTablets = async (req, res) => {
    try {
        const userID = Number(req.params.id);
        const assignedTablets = await UserTablet.findAll({where: {UserId: userID}});
        const listOfIDs = assignedTablets.map(data => data.TabletId);
        return res.status(200).send(listOfIDs);
    } catch (error) { res.status(500).send(error.message) }
};

module.exports = {
    loginUser,
    signupUser,
    getUser,
    getAllStudents,
    assignTablet,
    getAssignedTablets
};