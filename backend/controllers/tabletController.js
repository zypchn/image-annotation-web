const Tablet = require("../models/tabletModel");
const mongoose = require("mongoose");

// all tablets display page
const displayTablets = async (req, res) => {
    const tablets = await Tablet.find({})    // find all
    res.status(200).json(tablets)
}

// tablet label page
const labelTablet = async = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).json({error: "invalid id"}) }
    
    const tablet = await Tablet.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    
    if (!tablet) { return res.status(404).json({error: "tablet not found"}) }
    
    res.status(200).json(tablet);
}


// upload tablet page
const uploadTablet = async (req, res) => {
    const { tabletName, tabletPath } = req.body;
    try {
        const tablet = await Tablet.create({ tabletName, tabletPath });
        res.status(200).json(tablet);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    displayTablets,
    labelTablet,
    uploadTablet
}