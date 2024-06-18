const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.users;

const requireAuth = async (req, res, next) => {
    
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({error: "Auth token required!"}); }
    
    const token = authorization.split(" ")[1];
    
    try {
        const {id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findByPk(id);
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};

module.exports = requireAuth;