const mongoose = require('mongoose');

const departementSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('departement', departementSchema);