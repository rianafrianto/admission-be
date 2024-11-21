
const dbPool = require('../config/database');


const getAllUsers = (data) => {
    const {offset, search} = data
    console.log({offset, search})
    const SQLQuery = `SELECT * FROM users WHERE name LIKE '%${search}%' OR email LIKE '%${search}%' LIMIT 10 OFFSET ${offset}`;
    return dbPool.execute(SQLQuery);
}

const getUsersTotal = (body) => {
    const {search} = body;
    const SQLQuery = `SELECT COUNT(*) AS total FROM users WHERE name LIKE '%${search}%' OR email LIKE '%${search}%'`;
    return dbPool.execute(SQLQuery);
  };

const createNewUsers = (body) => {
    const SQLQuery = `INSERT into users (name, email, password, type, provider)
    VALUES ('${body.name}','${body.email}', '${body.password}', '${body.type}','${body.provider}')`;
    return dbPool.execute(SQLQuery);
}

const checkUser = (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
    return dbPool.execute(SQLQuery);
}

const getUserByID = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE id = '${id}' LIMIT 1`;
    return dbPool.execute(SQLQuery);
}


module.exports={
    getAllUsers,
    createNewUsers,
    checkUser,
    getUserByID,
    getUsersTotal
}