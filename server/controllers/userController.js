const db = require('../models/index');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });

  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await db.User.create({
      ...req.body,
      password: hashedPassword,
    });

    req.session.id = user.id;
    const { password, ...data } = user;
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCheck) throw new Error();
    req.session.id = user.id;
    const { password, ...data } = user;
    res.status(200).send(data);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params[id];
    console.log(req.params);
    const user = await db.User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'User not found' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};
