const dbPool = require('../config/database');

const getSettings = () => {
    const SQLQuery = `SELECT * FROM settings LIMIT 1`
    return dbPool.execute(SQLQuery);
}

const saveSettings = (data) => {
    const {admin_email, consultation_price, tuition_price} = data.data;
    const SQLQuery = `UPDATE settings SET admin_email = ?, consultation_price = ?, tuition_price = ? WHERE id=1`;
    const params = [
        admin_email,
        parseInt(consultation_price),
        parseInt(tuition_price)
    ]
    return dbPool.execute(SQLQuery, params);
}


module.exports = {
    getSettings,
    saveSettings
}