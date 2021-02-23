var express = require('express');
var router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

/* signup. */
router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email })
        .then(result => {
            if (result.length < 1) {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(404).json({
                            message: err
                        })
                    } else {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
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
                    }
                });

            } else {
                res.status(404).json({
                    message: 'email already existe'
                })
            }

        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })

});

router.get('/signin', (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password)
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                message: 'you are sign in'
                            })
                        } else {
                            res.status(404).json({
                                message: 'wrong passwrod'
                            })
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            message: err
                        })
                    })

            } else {
                res.status(404).json({
                    message: "email not registred"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.put('/:id', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                email: req.body.email,
                password: hash
            }
            User.findOneAndUpdate({ _id: req.params.id }, { $set: user })
                .then(result => {
                    if (result) {
                        res.status(200).json({
                            message: "user updated with success",
                        })
                    } else {
                        res.status(404).json({
                            message: 'user not found'
                        })
                    }
                })
                .catch(err => {
                    res.status(404).json({
                        message: err
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.delete('/:id', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(result => {
            if (result) {
                res.status(204).json({
                    message: 'user deleted with success'
                })
            } else {
                res.status(200).json({
                    message: 'user not found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.get('/', (req, res, next) => {
    const user = User.find({}, 'firstName lastName email')
        .then(result => {
            res.status(200).json({
                users: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
})
module.exports = router;