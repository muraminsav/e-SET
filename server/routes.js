const {
  createUser,
  loginUser,
  getUser,
  logout,
  updateUser,
  deleteUser,
} = require('./controllers/userController');
const authMiddleware = require('./middleware/auth');

const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me/:id', authMiddleware, getUser);
router.post('/logout/', authMiddleware, logout);
router.put('/updateUser/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;
