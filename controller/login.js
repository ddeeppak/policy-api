const db = require('../database/database');

const pass = async (email) =>{
    try{
        const [record] = await db.query('CALL GETPASS(?)',[email]);
        return record;
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    pass
}