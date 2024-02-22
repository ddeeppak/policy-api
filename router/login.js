const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../controller/login');

const router = express.Router();

const mailer = require('../controller/mailer');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await key.pass(email);
    if (userData[0].length> 0) {
      const user = userData[0][0];
      
      const isPasswordMatch = await bcrypt.compare(password, user.PASS);


      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            userid: user.ID,
            name: user.NAME,
            email: user.E_MAIL,
            role:user.ROLE
          },
          'Deepak',
          { expiresIn: '30m' }
        );
        const roles = JSON.parse(user.ROLE);
        res.status(200).json({
          status: "OK",
          message: "Auth Success",
          token: token,
          name:user.NAME,
          role:roles.ADMIN
        });
        mailer.login(user.NAME,user.E_MAIL);
      } else {
        res.status(401).json({
          status: "Unauthorized",
          message: "Auth Failed - Incorrect Password"
        });
      }
    } else {
      res.status(401).json({
        status: "Unauthorized",
        message: "Auth Failed - User not found"
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
