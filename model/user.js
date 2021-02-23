const mongoose = require('mongoose');
const validator = require('validator');
const departement = require('./departement');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }
    },
    password: {
        type: String,
        required: true
    },
    departement_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departement',
        required: false
    }

})

module.exports = mongoose.model('User', userSchema);