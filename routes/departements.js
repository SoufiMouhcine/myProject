var express = require('express');
var router = express.Router();
const departementController = require('../controllers/index');


router.post('/', departementController.departement.departement.addDepartement);

router.get('/', departementController.departement.departement.getAllDepartements);

router.put('/:id', departementController.departement.departement.updateDepartement);

router.delete('/:id', departementController.departement.departement.deleteDepartement)

router.get('/:id', departementController.departement.departement.getDepartementById)

module.exports = router;