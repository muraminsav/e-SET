const {
  createUser,
  loginUser,
  getUser,
  logout,
} = require('./controllers/userController');
const authMiddleware = require('./middleware/auth');

const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me/::id', authMiddleware, getUser);
router.post('/logout/', authMiddleware, logout);

module.exports = router;
