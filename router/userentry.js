const express = require('express');
const router = express.Router();
const database = require('../database/database');
const admin = require('../controller/admin');
const mailer = require('../controller/mailer');
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
    const { Name, Contact, mail } = req.body;
    try {
        const hash = await bcrypt.hash(Name+Contact, 10);
        await database.query('INSERT INTO newuser (Name, Contact, mail) VALUES (?, ?, ?)', [Name, Contact, mail]);
        res.status(201).json({ message: "User entry successful" });
        admin.createUser(mail,Name,18,hash,100000);
        await mailer.newregistration(mail, Name, Name+Contact);
    } catch (error) {
        console.error("Error in UserEntry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
