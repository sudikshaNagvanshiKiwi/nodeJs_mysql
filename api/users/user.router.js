const { createUser, getUsers, getUserById,
     updateUser, deleteUser, login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validate')
const { addUserValidation } = require('../../validation/users/user.validation')

router.post('/', checkToken, addUserValidation, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post("/login", login)


module.exports = router;