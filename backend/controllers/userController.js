const db = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendOTP");

const User = db.users;
const Tablet = db.tablets;
const UserTablet = db.usertablet;
const userOTP = db.userotp;

// create a Login token for React Context Provider
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: "12h" });
};

// login a user : POST
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { return res.status(400).send("All fields must be filled!"); }
        
        const user = await db.users.findOne({ where: {email} });
        if (!user) { return res.status(400).send("Incorrect email!"); }
        const userID = user.id;
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) { return res.status(400).send("Incorrect password!"); }
        
        if (!user.verified) { return res.status(400).send("Email not verified!") }
        
        const token = createToken(user.id);
        
        return res.status(200).json({email, userID, token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// register a user to the database : POST
const signupUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password || !role) { return res.status(400).send("All fields must be filled!"); }
        let userExists = await db.users.findOne({ where: {email} });
        
        if (!validator.isEmail(email)) { return res.status(400).send("Invalid Email!") }
        
        if (userExists && !(userExists.verified)) {
            await db.users.destroy({ where: {email} });
            userExists = await db.users.findOne({ where: {email} });
        }
        
        if (userExists) { return res.status(400).send("Email already in use!") }
        
        if (!validator.isStrongPassword(password)) { return res.status(400).send("Password not strong enough!") }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await db.users.create({
            name,
            email,
            password: hash,
            role,
            verified: false,
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

// get the info of a single user : GET
const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    return res.status(200).json(user);
};

// get all users with role=Student : GET
const getAllStudents = async (req, res) => {
    const role = "Student";
    const students = await User.findAll({where: {role}})
    return res.status(200).json(students)
};

// make a relation between a user and a Tablet : POST
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

// get all Tablets that have a relation with a user : GET
const getAssignedTablets = async (req, res) => {
    try {
        const userID = Number(req.params.id);
        const assignedTablets = await UserTablet.findAll({where: {UserId: userID}});
        const listOfIDs = assignedTablets.map(data => data.TabletId);
        let listOfCustomIDs = {};
        for (const id of listOfIDs) {
            const tablet = await Tablet.findByPk(id);
            listOfCustomIDs[id] = tablet.customID;
        }
        return res.status(200).send(listOfCustomIDs);
    } catch (error) { res.status(500).send(error.message) }
};

// verify the One-Time Password and set verified column to True : POST
const verifyOTP = async (req, res) => {
    try {
        let {userEmail, otp} = req.body;
        const user = await User.findAll({where: {email: userEmail}});
        const userID = user[0].id;
        if (!userID || !otp) { res.status(500).send("empty OTP details are not allowed!") }
        else {
            const OTPRecord = await userOTP.findAll({where: {UserId: userID}});
            if (OTPRecord.length <= 0) { res.status(400).send("Account doesn't exist or has been verified already!") }
            else {
                const expiresAt = OTPRecord[0].expiresAt;
                const hashedOTP = OTPRecord[0].otp;
                
                if (expiresAt < Date.now()) {
                    await db.userotp.destroy({where: {UserId: userID}});
                    await db.users.destroy({where: {id: userID}});
                    return res.status(400).send("Code has expired");
                }
                else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    
                    if (!validOTP) { return res.status(400).send("Invalid code! Please check your inbox.") }
                    else {
                        const user = await User.findByPk(userID);
                        user.verified = true;
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

// remove the relation between user and Tablet : POST
const removeTabletFromUser = async (req, res) => {
    try {
        const { userID, tabletID } = req.body;
        await UserTablet.destroy({
            where: {
                UserId: userID,
                TabletId: tabletID
            }
        })
        return res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    loginUser,
    signupUser,
    getUser,
    getAllStudents,
    assignTablet,
    getAssignedTablets,
    verifyOTP,
    removeTabletFromUser
};