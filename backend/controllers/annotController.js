const db = require("../models");

const Annot = db.annotations;

const getAnnots = async (req, res) => {
    try {
        const TabletId = req.params.id;
        const annots = await Annot.findAll({where: {TabletId: TabletId}});
        return res.send(JSON.stringify(annots));
    } catch (error) { res.status(500).send(error.message) }
};

const updateAnnots = async (req, res) => {
    try {
        const TabletId = req.params.id;
        const new_annots = req.body.annotations;
        
        await Annot.bulkCreate(new_annots, {
            updateOnDuplicate: ["label", "lang", "col_no", "row_no", "mark"]
        });
        
        const updatedAnnots = await Annot.findAll({ where: { TabletId: TabletId } });
        return res.status(200).send(updatedAnnots);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteAnnot = async (req, res) => {
    try {
        const annotId = req.params.id;
        const annot = await Annot.findByPk(annotId);
        // TODO continue
        if (annot === null) {
            // user MAY try to delete a locally saved annotation, not from the database
            return res.send(400); // client error
        }
        else {
            await annot.destroy();
            return res.status(200);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAnnots,
    updateAnnots,
    deleteAnnot
}