var express = require('express');
var router = express.Router();
const departement = require('../model/Departement');

router.post('/', (req, res, next) => {
    const dep = new departement({
        name: req.body.name
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
});

router.get('/', (req, res, next) => {
    const dep = departement.find()
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
});

router.put('/:id', (req, res, next) => {
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
});

router.delete('/:id', (req, res, next) => {
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
})

module.exports = router;