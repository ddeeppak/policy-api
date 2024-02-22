const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const admin = require('../controller/admin');
const mailer = require('../controller/mailer');
const rolecheck = require('../middleware/rolecheck');
const roles = require('../config/roles');

router.get('/', rolecheck(roles.ADMIN), async (req, res, next) => {
  try {
    const data = await admin.getUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server Error",
    });
  }
});

router.get('/:id', rolecheck(roles.ADMIN), async (req, res, next) => {
  try {
    const data = await admin.getUser(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server Error",
    });
  }
});

router.post('/', rolecheck(roles.ADMIN), async (req, res, next) => {
  const body = req.body;
  try {
    const hash = await bcrypt.hash(body.password, 10);

    const data = await admin.createUser(
      body.email,
      body.name,
      body.age,
      hash,
      body.amount
    );

    await mailer.newregistration(body.email, body.name, body.password);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server Error",
    });
  }
});

router.delete('/', rolecheck(roles.ADMIN), async (req, res, next) => {
  try {
    const id = req.body.id;

    const data = await admin.deleteUser(id);
    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server Error",
    });
  }
});

router.patch('/', rolecheck(roles.ADMIN), async (req, res, next) => {
  try {
    const id =parseInt(req.body.id || req.userinfo.id);
    const { name, age, amount,email } = req.body;
    const data = await admin.updateUser(id, name ,email, parseInt(age), parseFloat(amount));
    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server Error",
    });
  }
});

module.exports = router;
