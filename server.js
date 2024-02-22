const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const morgan = require('morgan');


require("express-async-errors");
const database = require("./database/database.js");
const login = require('./router/login');
const claims = require('./router/claims');
const admin = require('./router/admin');
const check = require('./middleware/check.js');
const  c= require('./controller/claims.js');
const rolecheck = require('./middleware/rolecheck');
const roles = require('./config/roles');
const usersOp = require ('./controller/admin.js');

const cors = require('cors');


app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://policy-site-three.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, GET, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
});

app.use(morgan('dev'));

app.use(bodyparser.json());


app.use('/login',login);

app.use('/Claims',check,claims);

app.use('/UserClaims',check, rolecheck(roles.ADMIN, roles.USER), async (req, res, next) => {
  try {
      
      const customer_id =req.userinfo.userid;
      const data = await c.getClaims(customer_id);
      res.status(200).json(data[0]);
  } catch (error) {
      res.status(500).json({
          status: "ERROR",
          message: "Internal server Error"
      });
  }
});


app.use('/policyData', check, rolecheck(roles.USER), async (req, res, next) => {
  try {
      const customer_id = req.userinfo.userid;
      const data = await usersOp.userdata(customer_id);
      res.status(200).json(data[0]);
  } catch (error) {
      res.status(500).json({
          status: "ERROR",
          message: "Internal server Error"
      });
  }
});



app.use('/Users',check,admin);

app.use(async (req,res)=>{
  res.status(404).json({
    "Status":"OK",
    "Message":"Resource Not Found"
  })
})

database
  .query("select 1")
  .then(() => {
    console.log("Connecting to Database successful");
    app.listen(5000, () => console.log("server started at 5000 "));
  })
  .catch((err) => console.log("Connecting to Database failed \n" + err));
