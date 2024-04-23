const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tabletSchema = new Schema({
    tabletName: {
        type: String,
        required: true,
        unique: true
    },
    tabletPath: {
        type: String,
        required: true,
        unique: true
    },
    
    // TODO: add constructor for labels
    
}, { timestamps: true })

const TabletModel = mongoose.model("tablet", tabletSchema);
module.exports = TabletModel;