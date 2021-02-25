var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/index');

/* signup. */
router.post('/signup', userController.users.users.signup);

router.get('/signin', userController.users.users.signin);

router.post('/', auth, userController.users.users.addUser);

router.get('/', auth, userController.users.users.getUsers);

router.get('/:id', auth, userController.users.users.getUserById);

router.put('/:id', auth, userController.users.users.updateUser);

router.delete('/:id', auth, userController.users.users.deleteUser);

module.exports = router;