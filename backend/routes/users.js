const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userUpdateValidation, setAvatarValidation, registrationValidation } = require('../middlewares/validation');
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser, createUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);
router.post('/', registrationValidation, createUser);
router.patch('/me', userUpdateValidation, updateUser);
router.patch('/me/avatar', setAvatarValidation, updateAvatar);

module.exports = router;
