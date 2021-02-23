const mongoose = require('mongoose');

const departementSchema = mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Departement', departementSchema);