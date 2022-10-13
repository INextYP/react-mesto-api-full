const router = require('express').Router();
const { userUpdateValidation, setAvatarValidation, userIdSearchValidation } = require('../middlewares/validation');
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', userIdSearchValidation, getUserById);

router.patch('/me', userUpdateValidation, updateUser);

router.patch('/me/avatar', setAvatarValidation, updateAvatar);

module.exports = router;
