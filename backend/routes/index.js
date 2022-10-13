const router = require('express').Router();
const { login, createUser, signOut } = require('../controllers/users');
const {
  registrationValidation, loginValidation,
} = require('../middlewares/validation');


const routerUsers = require('./users');
const routerCards = require('./cards');

router.post('/signup', registrationValidation, createUser);

router.post('/signin', loginValidation, login);

router.get('/signout', signOut);

router.use('/users', routerUsers);

router.use('/cards', routerCards);

module.exports = router;
