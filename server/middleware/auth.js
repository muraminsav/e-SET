const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    const { id } = req.session;
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
