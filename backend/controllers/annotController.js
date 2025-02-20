const db = require("../models");

const Annot = db.annotations;

// get all Annotations : GET
const getAnnots = async (req, res) => {
    try {
        const TabletId = req.params.id;
        const annots = await Annot.findAll({where: {TabletId: TabletId}});
        return res.send(JSON.stringify(annots));
    } catch (error) { res.status(500).send(error.message) }
};

// update Annotations : PATCH
const updateAnnots = async (req, res) => {
    try {
        
        const filterByColValue = (item) => {
            return item.row_no > 0;
        }
        
        const TabletId = req.params.id;
        const new_annots = req.body.annotations.map(annot => ({
            ...annot,
            TabletId: TabletId
        }));
        const filtered_annots = new_annots.filter(filterByColValue);
        
        await Annot.bulkCreate(filtered_annots, {
            updateOnDuplicate: ["comment", "lang", "col_no", "row_no", "mark"]
        });
        
        const updatedAnnots = await Annot.findAll({ where: { TabletId: TabletId } });
        console.log(new_annots)
        return res.status(200).send(updatedAnnots);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
};


// delete single Annotation : DELETE
const deleteAnnot = async (req, res) => {
    try {
        const annotId = req.params.id;
        const annot = await Annot.findAll({ where: { id: annotId } });
        // TODO continue
        if (annot === null) {
            // user MAY try to delete a locally saved annotation, not from the database
            return res.send(400);
        }
        else {
            await Annot.destroy({
                where: {
                    id: annotId,
                }
            });
            return res.status(200);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getAnnots,
    updateAnnots,
    deleteAnnot
}