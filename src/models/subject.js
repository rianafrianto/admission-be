const dbPool = require('../config/database');

const getAllSubject = () => {
    const SQLQuery = "SELECT * FROM subject";
    return dbPool.execute(SQLQuery);
}


//school_subject

const createSchoolSubject = (body) => {
    const SQLQuery = `INSERT INTO school_subject (school_id, subject_id) VALUES (${body.school_id},${body.subject_id})`;
    return dbPool.execute(SQLQuery);
}

const deleteSchoolSubject = (body) => {
    const SQLQuery = `DELETE FROM school_subject WHERE school_id = ${body.school_id}`;
    return dbPool.execute(SQLQuery);
}

const getFirstSchoolSubject = (body) => {
    const SQLQuery = `SELECT * FROM school_subject WHERE school_id = ${body.school_id} LIMIT 1`;
    return dbPool.execute(SQLQuery);
}

const getSchoolSubject = (body) => {
    const SQLQuery = `SELECT *, subject.subject as subject FROM school_subject JOIN subject ON subject.id = school_subject.subject_id WHERE school_id = ${body.school_id}`;
    return dbPool.execute(SQLQuery);
}



module.exports={
    getAllSubject,
    createSchoolSubject,
    deleteSchoolSubject,
    getFirstSchoolSubject,
    getSchoolSubject
}