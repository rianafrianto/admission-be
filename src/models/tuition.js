const dbPool = require('../config/database');
const { param } = require('../routes/users');

const getTuition = () => {

}

const getTuitioByUserId = (body) => {
    const SQLQuery = `SELECT * FROM tuition WHERE user_id = ?`;
    const params = [
        body.data.user_id
    ]
    return dbPool.execute(SQLQuery, params)
}

const createTuition = (body) => {
    const SQLQuery = `INSERT into tuition (user_id, full_name, email, phone, subject, grade, session, day, time, start) VALUES(?,?,?,?,?,?,?,?,?,?)`
    const params = [
        body.data.user_id,
        body.data.full_name,
        body.data.email,
        body.data.phone,
        body.data.subject,
        body.data.grade,
        body.data.session.toString(),
        body.data.day,
        body.data.time,
        body.data.start
    ]
    return dbPool.execute(SQLQuery, params);
}

module.exports = {
    createTuition,
    getTuitioByUserId
}