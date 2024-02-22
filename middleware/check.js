const jwt= require('jsonwebtoken');

module.exports =(req,res,next)=>{
    try{
        const decode= jwt.verify((req.headers.authorization).trim(),"Deepak");
        req.userinfo = decode;
        req.roles = JSON.parse(decode?.role);
        next();
        
    }
    catch(err){ res.status(402).json({
        message:"Auth Failed"
    })

    }
}