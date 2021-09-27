const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    console.log('hello from middleware', uid);
    const user = await db.User.findOne({ where: { id: uid } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
