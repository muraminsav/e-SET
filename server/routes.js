const {
  createUser,
  loginUser,
  getUser,
  logout,
} = require('./controllers/userController');

const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', getUser);
router.post('/logout', logout);

module.exports = router;
