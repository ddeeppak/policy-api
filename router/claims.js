const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const claims = require('../controller/claims');
const rolecheck = require('../middleware/rolecheck');
const roles = require('../config/roles');
const mailer = require('../controller/mailer');

router.get('/',rolecheck(roles.ADMIN),async (req, res, next)=>{
    try{
        const data = await claims.getAllClaims();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            status:"ERROR",
            message:"Internal server Error"
        })
    }

});

router.get('/:id',rolecheck(roles.ADMIN,roles.USER),async (req, res, next)=>{
    try {
        const data = await claims.getClaim(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({
          status: "ERROR",
          message: "Internal server Error",
        });
      }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.userinfo.userid;
        const userFolderPath = path.join('uploads', userId.toString());
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }
        cb(null, userFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', rolecheck(roles.ADMIN, roles.USER), upload.single('attachment'), async (req, res, next) => {
    try {
        const { type, amount } = req.body;
        const attachment = req.file;
        
        const { email, name } = req.userinfo;

        const data = await claims.createClaim(req.userinfo.userid, type, amount, attachment);

        await mailer.newClaims(name, email, amount, type);

        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            message: "Internal server Error"
        });
    }
});

router.delete('/',rolecheck(roles.ADMIN), async (req,res,next)=>{

    try{
        const id = req.body.id;
        const data = await claims.deleteClaim(id);
        res.status(204).json(data);

    } catch (error) {
        res.status(500).json({
            status:"ERROR",
            message:"Internal server Error"
        })
    }

})

router.patch('/', rolecheck(roles.ADMIN,roles.USER), async (req,res,next)=>{
    try{
        const {id,type,status,amount} = req.body;
        const customer_id =req.body["customer_id"] || req.userinfo.userid;
        const { email, name } = req.userinfo;
        const data = await claims.UpdateClaim(id,customer_id,amount,type,status);
        res.status(204).json(data);
        mailer.statusupdate(status,name,email);
    } catch (error) {
        res.status(500).json({
            status:"ERROR",
            message:"Internal server Error"
        })
    }
})

router.patch('/withdraw/:id',rolecheck(roles.USER), async (req,res,next) => {
    try{
        const customer_id = req.userinfo.userid;
        const id = req.params.id;
        const { email, name } = req.userinfo;
        await claims.withdraw(id,customer_id);
        res.status(200).json({message:"OK"});
        mailer.withdraw(name,email);
    } catch (error) {
        res.status(500).json({
            status:"ERROR",
            message:"Internal server Error"
        })
    }
})


module.exports = router;