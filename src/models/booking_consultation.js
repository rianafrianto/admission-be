const dbPool = require('../config/database');

const getAllBookingConsultation = () => {
    const SQLQuery = `SELECT * FROM booking_consultation JOIN schools ON booking_consultation.school_id = schools.id JOIN users ON booking_consultation.user_id = users.id `;
    return dbPool.execute(SQLQuery);
}

const getMyBookingConsultation = (body) => {
    const SQLQuery = `SELECT * FROM booking_consultation JOIN schools ON booking_consultation.school_id = schools.id JOIN users ON booking_consultation.user_id = users.id WHERE user_id = ${body.user_id}`
    return dbPool.execute(SQLQuery);
}

const createBookingConsultation = (body) => {
    const SQLQuery = `INSERT INTO booking_consultation (user_id, school_id, date, time, link, fullname, email, phone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        body.user_id,
        body.school_id,
        body.date,
        body.time,
        body.link,
        body.fullname,
        body.email,
        body.phone
    ];

    return dbPool.execute(SQLQuery, params);
}



module.exports = {
    getAllBookingConsultation,
    createBookingConsultation,
    getMyBookingConsultation
}