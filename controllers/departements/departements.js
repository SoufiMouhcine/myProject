const departement = require('../../models/Departement');

const addDepartement = (req, res) => {
    const dep = new departement({
        name: req.body.name,
        created_by: req.userId
    })
    dep.save()
        .then(result => {
            res.status(201).json({
                message: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })

};

const updateDepartement = (req, res) => {
    const dep = {
        name: req.body.name
    }
    departement.findOneAndUpdate({ _id: req.params.id }, { $set: dep })
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'departement updated'
                })
            } else {
                res.status(404).json({
                    message: 'departement not found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
};

const deleteDepartement = (req, res) => {
    departement.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json({
                message: "departement deleted"
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
};

const getAllDepartements = (req, res) => {
    const dep = departement.find().populate('created_by')
        .then(result => {
            res.status(200).json({
                departements: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
};

const getDepartementById = (req, res) => {
    departement.findById(req.params.id).populate('created_by')
        .then(result => {
            res.status(200).json({
                departement: result
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
};


module.exports = {
    addDepartement,
    getAllDepartements,
    updateDepartement,
    deleteDepartement,
    getDepartementById
}