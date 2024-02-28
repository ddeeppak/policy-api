
const express = require('express');

const router = express.Router();

const database = require('../database/database');

router.post('/', async (req,res,next) =>{
    const {Name,Contact,mail} = req.body;
    try{
        database.query('insert into newuser values (?,?,?)',[Name,Contact,mail]);
    }
    catch (error) {
        console.error("Error in UserEntry :",error);
    }
});
