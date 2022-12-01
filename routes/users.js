const users_controller = require('../controllers/user_controller')
var express = require('express');
var router = express.Router();

router.get('/p', users_controller.getPaginated)
router.get('/', users_controller.getUsers)
router.get('/:id', users_controller.getUserById);
router.get('/num/:number', users_controller.getUserByNumber);
router.post('/', users_controller.addUser)
//router.put('/:id', scammers_controller.putShipping)
router.delete('/:id', users_controller.deleteUser);

module.exports = router;
