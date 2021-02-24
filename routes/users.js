var express = require('express');
var router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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
                            password: hash,
                            departement_id: req.body.departement_id
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
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user);
            if (user) {
                //const usersa=JSON.parse(JSON.stringify(Object.assign({}, user)));
                //console.log(usersa);
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '4h' }
                                )
                            });
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

router.put('/:id', auth, (req, res, next) => {
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

router.delete('/:id', auth, (req, res, next) => {
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

router.get('/', auth, (req, res, next) => {
    const user = User.find({}, 'firstName lastName email').populate('departement_id', 'name')
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
});

router.get('/', auth, (req, res, next) => {
    const user = User.find({}, 'firstName lastName email').populate('departement_id', 'name')
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
});

router.get('/:id', auth, (req, res, next) => {
    const user = User.findById({ _id: req.params.id }, 'firstName lastName email').populate('departement_id', 'name')
        .then(result => {
            res.status(200).json({
                user: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

module.exports = router;