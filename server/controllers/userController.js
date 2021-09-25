const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'secret';

exports.createUser = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });

  try {
    if (user) {
      console.log('user exist');
      return res.status(400).send({ error: 'existing user' });
    }
  } catch (error) {
    console.log(error);
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
    res.status(500).send({ error: 'database error: ' + error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: { email: req.body.email },
    });
    if (!user[0]) {
      return res.status(404).send({ error: 'invalid credentials' });
    }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (!passwordCheck) {
      return res.status(404).send({ error: 'invalid credentials' });
    }
    const token = jwt.sign({ _id: user[0].id }, secret);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'database error: ' + error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, secret);

    if (!claims) {
      return res.status(401).send({ error: 'unauthenticated' });
    }
    const user = await db.User.findAll({
      where: { id: claims._id },
    });
    const result = user[0];
    const { password, ...data } = result;
    res.status(200).send(data);
  } catch (error) {
    return res.status(401).send({ error: 'unauthenticated' });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie('jwt', ' ', { maxAge: 0 });
    res.status(201).send({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'database error: ' + err });
  }
};
