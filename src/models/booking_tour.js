const dbPool = require('../config/database');

const getAllBookingTour = () => {
    const SQLQuery = `SELECT * FROM school_tour JOIN users ON users.id = school_tour.user_id JOIN schools ON schools.id = school_tour.school_id`;
    return dbPool.execute(SQLQuery);
}

const getBookinTourByUserId = (body) => {
    const SQLQuery = `SELECT * FROM school_tour JOIN users ON users.id = school_tour.user_id JOIN schools ON schools.id = school_tour.school_id WHERE school_tour.user_id = ?`;
    const params = [
        body.user_id
    ]
    return dbPool.execute(SQLQuery, params)
}


const createBookingTour = (body) => {
    const status = "Pending"
    const SQLQuery = `INSERT INTO school_tour (user_id, school_id, name, email, phone, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
        body.user_id,
        body.school_id,
        body.name,
        body.email,
        body.phone,
        status
    ]
    return dbPool.execute(SQLQuery,params);
}

module.exports = {
    getAllBookingTour,
    getBookinTourByUserId,
    createBookingTour
}