const db = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendOTP = require("../utils/sendOTP");

const User = db.users;
const Tablet = db.tablets;
const UserTablet = db.usertablet;
const userOTP = db.userotp;

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: "12h" });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { return res.status(400).send("All fields must be filled!"); }
        
        const user = await db.users.findOne({ where: {email} });
        if (!user) { return res.status(400).send("Incorrect email!"); }
        const userID = user.id;
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) { return res.status(400).send("Incorrect password!"); }
        
        if (user.verified !== "verified") { return res.status(400).send("Email not verified!") }
        
        const token = createToken(user.id);
        
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
        
        const verified = "not-verified";
        
        const user = await db.users.create({
            name,
            email,
            password: hash,
            role,
            verified: verified,
        });
        const userID = user.id
        const userEmail = user.email
        
        await sendOTP(userEmail, userID);
        
        return res.status(200).json({
            status: "PENDING",
            message: "OTP verification email sent",
            data: {
                id: userID,
                email: userEmail
            }
        });
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
        const tablet = await Tablet.findByPk(tabletID);
        
        for (const id of userID) {
            const user = await User.findByPk(id);
            if (!tablet || !user) { return res.status(404).send("User or Tablet not found!"); }
            await user.addTablet(tablet, {through: "user_tablet"});
        }
        return res.status(200).send("Successfully assigned!");
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

const verifyOTP = async (req, res) => {
    try {
        let {userEmail, otp} = req.body;
        const user = await User.findAll({where: {email: userEmail}});
        const userID = user[0].id;
        if (!userID || !otp) { res.status(500).send("empty OTP details are not allowed!") }
        else {
            const OTPRecord = await userOTP.findAll({where: {UserId: userID}});
            if (OTPRecord.length <= 0) { res.status(500).send("Account doesn't exist or has been verified already!") }
            else {
                const expiresAt = OTPRecord[0].expiresAt;
                const hashedOTP = OTPRecord[0].otp;
                
                if (expiresAt < Date.now()) {
                    await db.userotp.destroy({where: {UserId: userID}});
                    await db.users.destroy({where: {id: userID}});
                    return res.status(500).send("code has expired");
                }
                else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    
                    if (!validOTP) { res.send("invalid code. please check your inbox") }
                    else {
                        const user = await User.findByPk(userID);
                        user.verified = "verified";
                        await user.save();
                        await db.userotp.destroy({where: {UserId: userID}});
                        
                        if (user.role === "Moderator") {
                            const allTablets = await Tablet.findAll();
                            await user.addTablet(allTablets, {through: "user_tablet"});
                        }
                        
                        const userEmail = user.email
                        const token = createToken(userID);
                        return res.status(200).json({userEmail, token, userID});
                    }
                }
            }
        }
    
    } catch (error) { console.log(error) }
};

module.exports = {
    loginUser,
    signupUser,
    getUser,
    getAllStudents,
    assignTablet,
    getAssignedTablets,
    verifyOTP
};