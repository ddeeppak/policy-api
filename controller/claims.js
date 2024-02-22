const database = require('../database/database');

const getClaims = async (customer_id) => {
    try {
        const [record] = await database.query('CALL GETCLAIMS(?)', [customer_id]);
        return record;
    } catch (error) {
        console.error('Error in stored procedure:', error);
        throw error;
    }
  };

  const createClaim = async (customer_id,type,amount)=>
  {
      try{
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 
        const [record] = await database.query('INSERT INTO Claims(USERS_ID, AMOUNT, STATUS, DATE, CLAIMS_TYPE) VALUES (?, ?, ?, ?, ?)', [customer_id, amount, "PENDING", currentDate, type]);
          return record;
      } catch (error) {
          console.error('Error in insert :',error);
          throw error;
      }
  }

const searchClaimsByText = async (text) => {
    try {
      const id = parseInt(text);
      const [records] = await db.query("SELECT * FROM Claims WHERE  bill_number = ? OR id = ?", [id, id]);
      return records;
    } catch (error) {
      console.error("Error in Searching Claims", error);
      throw error;
    }
  };
const getClaim = async (id) => {
    try {
      console.log(id);
      const [record] = await database.query("SELECT * FROM claims WHERE ID=?", [id]);
      return record;
    } catch (error) {
      console.error("Error in getCliam:", error);
      throw error;
    }
  };

const getAllClaims = async () => {
    try {
      const [records] = await database.query("SELECT * FROM Claims;");
      return records;
    } catch (error) {
      console.error("Error in getAllClaims:", error);
      throw error;
    }
  };

const deleteClaim = async (id) => {
    try {
      const [record] = await database.query("DELETE FROM Claims WHERE id=?", [id]);
      return record;
    } catch (error) {
      console.error("Error in deleteClaim:", error);
      throw error;
    }
  };

const UpdateClaim = async (id,customer_id,amount,type,status) =>{
  try{
    const [record] = await database.query("UPDATE claims set AMOUNT=?,STATUS =?, CLAIMS_TYPE=? where USERS_ID=? and ID=?",[amount,status,type,customer_id,id]);
    return record;
  } catch (error) {
    console.log("Error in Update ",error);
    throw error;
  }
}
const withdraw = async (id,user_id) => {
  try{
    await database.query("UPDATE claims SET STATUS = ? WHERE USERS_ID = ? AND ID = ? AND STATUS = ?",["WITHDRAW", user_id, id, "PENDING"]);
    
  } catch (error) {
    console.log("Error in withdraw ",error);
    throw error;
  }
}


module.exports={
    getAllClaims,
    getClaim,
    getClaims,
    deleteClaim,
    createClaim,
    searchClaimsByText,
    UpdateClaim,
    withdraw

}