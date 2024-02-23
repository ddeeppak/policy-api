const database = require('../database/database');

const getUsers = async () => {
  try {
    const [record] = await database.query('CALL GETUSERS()');
    return record;
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const [record] = await database.query('SELECT * FROM USERS WHERE ID=? LIMIT 1', [id]);
    return record;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const createUser = async (email, name, age, password, amount) => {
  try {

    const newPolicyNumber = newpolicynumber();
    const [record] = await database.query('INSERT INTO USERS(NAME, AGE, E_MAIL, PASS,POLICY_NO, ROLE) VALUES (?, ?, ?,?, ?, ?)', [name, age, email, password,newPolicyNumber,'{"USER":55555555}']);
    await newpolicy(amount, name,newPolicyNumber);
    return record;
  } catch (error) {
    console.error('Error executing insert:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const [record] = await database.query('DELETE FROM USERS WHERE ID=?', [id]);
    return record;
  } catch (error) {
    console.error('Error in deleteClaim:', error);
    throw error;
  }
};

const updateUser = async (id, name, email, age, amount) => {
  try {
    const [record] = await database.query('CALL UPDATEUSER(?, ?, ?, ?, ?)', [id, name, email, amount, age]);
    return record;
  } catch (error) {
    console.error('Error executing update:', error);
    throw error;
  }
};

const newpolicy = async (amount, name,policy,userid) => {
  try {
    const currentDate = new Date();
    await database.query('INSERT INTO policy(policy_number, policy_holder, coverage_amount, start_date, end_date,user_id) VALUES (?, ?, ?, ?, ?,?)', [policy, name, amount, generateDates(currentDate), generateDates(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())),userid]);
  } catch (error) {
    console.error('Error executing new policy:', error);
    throw error;
  }
};

const newpolicynumber = () => {
  const digits = Math.floor(Math.random() * 90000000) + 10000000;
  return 'STP' + digits + 'V';
};

const generateDates = (Date) => {
  const formattedDate = Date.toISOString().split('.')[0];
  return formattedDate;
};

const userdata = (id) => {
  const data = database.query('Select * from policy where policy_number =(select POLICY_NO from users where id = ?)',[id]);
  return data;
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  userdata
};
