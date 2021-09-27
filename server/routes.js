const {
  createUser,
  loginUser,
  getUser,
  logout,
  updateUser,
} = require('./controllers/userController');
const authMiddleware = require('./middleware/auth');

const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me/:id', authMiddleware, getUser);
router.post('/logout/', authMiddleware, logout);
router.put('/updateUser/:id', authMiddleware, updateUser);

module.exports = router;
