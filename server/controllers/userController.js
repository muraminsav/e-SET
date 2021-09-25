const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'secret';

exports.createUser = async (req, res) => {
  const user = await db.User.findAll({ email: req.body.email });
  if (user[0].email == req.body.email) {
    console.log(user);
    return res.status(404).send({ where: { message: 'existing user' } });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      scores: req.body.scores,
    });
    const result = await user.save();
    const { password, ...data } = result.toJSON();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = await db.User.findAll({
    where: { email: req.body.email },
  });
  if (!user[0]) {
    return res.status(404).send({ message: 'invalid credentials' });
  }
  const passwordCheck = await bcrypt.compare(
    req.body.password,
    user[0].password
  );
  if (!passwordCheck) {
    return res.status(404).send({ message: 'invalid credentials' });
  }

  const token = jwt.sign({ _id: user[0].id }, secret);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });
  res.status(200).send({ message: 'success' });
};

exports.getUser = async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, secret);

    if (!claims) {
      return res.status(401).send({ message: 'unauthenticated' });
    }
    const user = await db.User.findAll({
      where: { id: claims._id },
    });
    const result = user[0];
    const { password, ...data } = result;
    res.status(200).send(data);
  } catch (error) {
    return res.status(401).send({ message: 'unauthenticated' });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 0 });

  res.status(201).send({ message: 'success' });
};
