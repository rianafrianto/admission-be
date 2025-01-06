const dbPool = require('../config/database');


const getDsa = () => {
    const SQLQuery = "SELECT * FROM dsa_talent";
    return dbPool.execute(SQLQuery);
}

module.exports={
    getDsa
}