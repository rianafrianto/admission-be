const dbPool = require('../config/database');


const getAllAreas = () => {
    const SQLQuery = "SELECT * FROM area";
    return dbPool.execute(SQLQuery);
}

module.exports={
    getAllAreas
}