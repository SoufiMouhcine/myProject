const mongoose = require('mongoose');
const validator = require('validator');


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
        unique: true,
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
        ref: 'departement',
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);