const multer = require("multer");
const db = require("../models");
const sizeOf = require("image-size");
const redis = require("redis");
const { promisify } = require("util");

const Tablet = db.tablets;
const User = db.users;
const UserTablet = db.usertablet;

const UPLOAD_PATH=process.env.UPLOAD_PATH;

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("please upload ONLY images", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const getAllTablets = async (req, res) => {
    const listOfTablets = await Tablet.findAll();
    res.json(listOfTablets);
};

const uploadTablet = async (req, res) => {
    try {
        if (req.file === undefined) { return res.send("you must select a file") }
        
        const dimensions = sizeOf(req.file.path);
        
        await Tablet.create({
            name: req.file.filename,
            path: req.file.path,
            status: "pending",
            isLocked: 0,
            height: dimensions.height,
            width: dimensions.width,
        });
        
        const role = "Moderator";
        const name = req.file.filename;
        const tablet = await Tablet.findAll({where: {name}})
        const allMods = await User.findAll({where: {role}});
        
        for (const element of allMods) {
            try {
                const id = element.dataValues.id;
                const mod = await User.findByPk(id);
                await mod.addTablet(tablet, {through: "user_tablet"});
            } catch (error) { return res.status(500).send(error.message) }
        }
        
        return res.send("file uploaded successfully");
    } catch (error) {
        return res.status(500).send("error when uploading image: " + error);
    }
};

const getTablet = async (req, res) => {
    try {
        const id = req.params.id;
        const tablet = await Tablet.findByPk(id);
        return res.json(tablet);
    } catch (error) { res.status(500).send(error.message) }
};

const getAssignedUsers = async (req, res) => {
    try {
        const tabletID = Number(req.params.id);
        const assignedUsers = await UserTablet.findAll({where: {TabletId: tabletID}});
        const listOfIDs = assignedUsers.map(data => data.UserId);
        return res.status(200).send(listOfIDs);
    } catch (error) { res.status(500).send(error.message) }
};

const changeStatus = async (req, res) => {
    try {
        const tabletID = req.params.id;
        const status = req.body;
        const tablet = await Tablet.findByPk(tabletID);
        Object.assign(tablet, status);
        await tablet.save();
        return res.send(tablet)
    } catch (error) { res.status(500).send(error.message) }
};

const changeCustomID = async (req, res) => {
    try {
        const tabletID = req.params.id;
        const customID = req.body;
        const tablet = await Tablet.findByPk(tabletID);
        Object.assign(tablet, customID);
        await tablet.save();
        return res.send(tablet)
    } catch (error) { res.status(500).send(error.message) }
};

const changeLock = async (req, res) => {
    try {
        const tabletID = req.params.id;
        const isLocked = req.body;
        const isLockedStr = String(isLocked)
        const tablet = await Tablet.findByPk(tabletID);
        if ((!isLockedStr === "1") || (!isLockedStr === "0")) {
            return
        }
        Object.assign(tablet, isLocked);
        await tablet.save();
        return res.send(tablet)
    } catch (error) { res.status(500).send(error.message) }
};

const checkLock = async (req, res) => {
    try {
        const tabletID = req.params.id;
        const tablet = await Tablet.findByPk(tabletID);
        return res.send(tablet.isLocked);
    } catch (error) { res.status(500).send(error.message) }
}

module.exports = {
    storage,
    imageFilter,
    getAllTablets,
    uploadTablet,
    getTablet,
    getAssignedUsers,
    changeStatus,
    changeLock,
    changeCustomID,
    checkLock
};