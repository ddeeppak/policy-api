const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.post('/', async (req, res, next) => {
    const { Name, Contact, mail } = req.body;
    try {
        await database.query('INSERT INTO newuser (Name, Contact, mail) VALUES (?, ?, ?)', [Name, Contact, mail]);
        res.status(201).json({ message: "User entry successful" });
    } catch (error) {
        console.error("Error in UserEntry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
