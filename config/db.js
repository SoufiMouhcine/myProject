const mongoose = require('mongoose');

const connectdb = mongoose.connect('mongodb://localhost/myProject', { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if (err) {
        console.log(err)
        return
    } else {
        console.log("connect to DB")
    }
});

module.exports = connectdb;