const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    User.find({ email: req.body.email })
        .then(result => {
            if (result.length < 1) {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(404).json({
                            error: err
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
                                    data: result
                                })
                            })
                            .catch(err => {
                                res.status(404).json({
                                    error: err
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
                error: err
            })
        })
};

const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                //const usersa=JSON.parse(JSON.stringify(Object.assign({}, user)));
                //console.log(usersa);
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                user: user,
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
                            error: err
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
                error: err
            })
        })
}

const addUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(404).json({
                error: err
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
                        data: result
                    });
                })
                .catch(err => {
                    res.status(409).json({
                        error: "email already exist"
                    });
                })
        }

    })
};

const getUsers = (req, res) => {
    const user = User.find({}, 'firstName lastName email').populate('departement_id', 'name')
        .then(result => {
            res.status(200).json({
                data: result
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
};

const getUserById = (req, res) => {
    const user = User.findById({ _id: req.params.id }, 'firstName lastName email').populate('departement_id', 'name')
        .then(result => {
            res.status(200).json({
                data: result
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
};

const updateUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                departement_id: req.body.departement_id
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
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
};

const deleteUser = (req, res) => {
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
                error: err
            })
        })

};

module.exports = {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    signin,
    signup,
    addUser
};