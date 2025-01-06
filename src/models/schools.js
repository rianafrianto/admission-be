const dbPool = require('../config/database');


const createNewSchool = (body) => {
    const SQLQuery = `INSERT INTO schools (school_name, school_area, school_type, school_address, school_level, minimum_age,maximum_age)
    VALUES('${body.schoolName}', ${body.schoolArea}, ${body.schoolType}, '${body.schoolAddress}', ${body.schoolAgeLevel}, ${body.minimumAge}, ${body.maximumAge}) `;
    return dbPool.execute(SQLQuery);
}


const getSchoolById = (id)=> {
    const SQLQuery = `SELECT * FROM schools WHERE schools.id = ${id}`;
    return dbPool.execute(SQLQuery);
}

const getSchools = (data) => {
    const {offset, search} = data;
      const SQLQuery = `SELECT * FROM schools WHERE school_name LIKE '%${search}%' LIMIT 10 OFFSET ${offset}`;
    return dbPool.execute(SQLQuery);
}

const findSchoolGoverment = (data) => {
  const { schoolType, ageLevel } = data
  // const SQLQuery = `SELECT *,
  // area.area_name as school_area_name,
  // schools.id as school_id  
  // FROM
  // schools JOIN area ON schools.school_area = area.id
  // WHERE school_type=${schoolType} 
  // AND school_level = ${ageLevel}`

  const SQLQuery = `SELECT
  schools.*,
  area.area_name AS school_area_name,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'dsa_talent_id', dsa_talent.id, 
      'dsa_talent', dsa_talent.talent
    )
  ) AS dsa  -- Concatenate dsa_talent_id and dsa_talent into an array of objects
FROM
  schools
JOIN
  area ON schools.school_area = area.id
LEFT JOIN
  school_dsa ON schools.id = school_dsa.school_id
LEFT JOIN
  dsa_talent ON school_dsa.dsa_talent_id = dsa_talent.id
WHERE
  schools.school_type = ${schoolType}
  AND schools.school_level = ${ageLevel}
GROUP BY
schools.id, area.area_name;`;
  return dbPool.execute(SQLQuery);
}

const findSchoolInternational = (data) => {
  const {schoolType, from, to} = data;
  const SQLQuery = `SELECT 
  s.*,
  GROUP_CONCAT(DISTINCT ci.curriculum) AS school_curriculum, 
  GROUP_CONCAT(DISTINCT li.language) AS school_language,
   JSON_ARRAYAGG(
        JSON_OBJECT('id', ci.id, 'curriculum', ci.curriculum)
      ) AS curriculum
FROM 
  schools s
LEFT JOIN 
  school_curriculum_inter sci ON s.id = sci.school_id
LEFT JOIN 
  curriculum_inter ci ON sci.curriculum_inter_id = ci.id
LEFT JOIN 
  school_language_inter sli ON s.id = sli.school_id
LEFT JOIN 
  language_inter li ON sli.language_inter_id = li.id
WHERE 
  s.school_type = ${schoolType}
  AND s.minimum_age <= ${parseInt(from)}
  AND s.maximum_age >= ${parseInt(to)}
GROUP BY 
  s.id;`;
  return dbPool.execute(SQLQuery);
}

const getSchoolsTotal = (body) => {
    const {search} = body;
    const SQLQuery = `SELECT COUNT(*) AS total FROM schools WHERE school_name LIKE '%${search}%'`;
    return dbPool.execute(SQLQuery);
  };

const setSchoolContact = (bodys) => {
    const {body} = bodys;
    const SQLQuery = `UPDATE schools SET phone = '${body.phone}', email = '${body.email}', website = '${body.website}' WHERE id = ${parseInt(body.id)}`;
    return dbPool.execute(SQLQuery);
}

const getElectiveList = () => {
  const SQLQuery = `SELECT * FROM elective_items`;
    return dbPool.execute(SQLQuery);
};


const checkElectiveList = (body) => {
    const SQLQuery = `SELECT * FROM school_elective WHERE school_id = ${body.school_id} AND type=${body.type} LIMIT 1`
    return dbPool.execute(SQLQuery);
}

const deleteElectiveSchool = (body) => {
    const SQLQuery = `DELETE FROM school_elective WHERE school_id = ${body.school_id} AND type=${body.type}`
    return dbPool.execute(SQLQuery);
}

const createElectiveSchool = (body) => {
    const SQLQuery = `INSERT INTO school_elective (school_id, elective_id, type) VALUES(${body.school_id},${body.elective_id}, ${body.type})`
    return dbPool.execute(SQLQuery);
}

const getElectiveSchool = (body) => {
    const SQLQuery = `SELECT *, elective_items.elective as elective,elective_category.category as category  FROM school_elective JOIN elective_items ON school_elective.elective_id = elective_items.id JOIN elective_category ON elective_category.id = elective_items.category_id WHERE school_id = ${body.school_id}`
    return dbPool.execute(SQLQuery);
}

const createPSLE = (body) => {
    const SQLQuery = `INSERT INTO psle_score (school_id, years, af3,af2,af1,at3,at2,at1,nf3,nf2,nf1,nt3,nt2,nt1) VALUES(
    ${parseInt(body.school_id)},${body.year},'${body.af3}','${body.af2}','${body.af1}','${body.at3}','${body.at2}','${body.at1}','${body.nf3}','${body.nf2}','${body.nf1}','${body.nt3}','${body.nt2}','${body.nt1}'
    )`;
    return dbPool.execute(SQLQuery);
}

const getPSLE = (body) => {
    const SQLQuery = `SELECT * FROM psle_score WHERE school_id = ${body.school_id}`;
    return dbPool.execute(SQLQuery);
}

const updatePSLE = (body) => {
    const SQLQuery = `UPDATE psle_score
    SET 
        years = COALESCE(?, years), 
        af3 = COALESCE(?, af3), 
        af2 = COALESCE(?, af2), 
        af1 = COALESCE(?, af1), 
        at3 = COALESCE(?, at3), 
        at2 = COALESCE(?, at2), 
        at1 = COALESCE(?, at1), 
        nf3 = COALESCE(?, nf3), 
        nf2 = COALESCE(?, nf2), 
        nf1 = COALESCE(?, nf1), 
        nt3 = COALESCE(?, nt3), 
        nt2 = COALESCE(?, nt2), 
        nt1 = COALESCE(?, nt1)
    WHERE school_id = ?`;
    
    const values = [
        body.year || "-", 
        body.af3 || "-", 
        body.af2 || "-", 
        body.af1 || "-", 
        body.at3 || "-", 
        body.at2 || "-", 
        body.at1 || "-", 
        body.nf3 || "-", 
        body.nf2 || "-", 
        body.nf1 || "-", 
        body.nt3 || "-", 
        body.nt2 || "-", 
        body.nt1 || "-", 
        body.school_id
    ];
    return dbPool.execute(SQLQuery, values);
}

//CCAs

const getCCAsList = () => {
    const SQLQuery = `SELECT * FROM ccas`;
    return dbPool.execute(SQLQuery);
}

const getSchoolCCAs = (body) => {
    const SQLQuery = `SELECT *,ccas.ccas as ccas  FROM school_ccas JOIN ccas ON school_ccas.ccas_id = ccas.id WHERE school_id = ${body.school_id} `;
    return dbPool.execute(SQLQuery);
}

const createSchoolCCAs = (body) => {
    const SQLQuery = `INSERT INTO school_ccas (school_id, ccas_id) VALUES (${body.school_id},${body.ccas_id})`;
    return dbPool.execute(SQLQuery);
}

const deleteSchoolCCAs = (body) => {
    const SQLQuery = `DELETE FROM school_ccas WHERE school_id = ${body.school_id}`;
    return dbPool.execute(SQLQuery);
}

const getDSATalentList = () => {
    const SQLQuery = `SELECT * FROM dsa_talent`;
    return dbPool.execute(SQLQuery);
}

const getSchoolDSAs = (body) => {
    const SQLQuery = `
      SELECT *, dsa_talent.talent as talent
      FROM school_dsa
      JOIN dsa_talent ON school_dsa.dsa_talent_id = dsa_talent.id
      WHERE school_id = ${body.school_id}
    `;
    return dbPool.execute(SQLQuery);
  };
  
  const createSchoolDSAs = (body) => {
    const SQLQuery = `
      INSERT INTO school_dsa (school_id, dsa_talent_id)
      VALUES (${body.school_id}, ${body.dsa_talent_id})
    `;
    return dbPool.execute(SQLQuery);
  };
  
  const deleteSchoolDSAs = (body) => {
    const SQLQuery = `
      DELETE FROM school_dsa
      WHERE school_id = ${body.school_id}
    `;
    return dbPool.execute(SQLQuery);
  };

  //International School Curriculum

  const getCurriculumInter = () => {
    const SQLQuery = ` SELECT * FROM curriculum_inter`;
    return dbPool.execute(SQLQuery);
  }

  const createSchoolCurriculumInter = (body) => {
    const SQLQuery = `
      INSERT INTO school_curriculum_inter (school_id, curriculum_inter_id)
      VALUES (${body.school_id}, ${body.curriculum_inter_id})
    `;
    return dbPool.execute(SQLQuery);
  };

  const deleteSchoolCurriculumInter = (body) => {
    const SQLQuery = `
      DELETE FROM school_curriculum_inter
      WHERE school_id = ${body.school_id}
    `;
    return dbPool.execute(SQLQuery);
  };

  const getSchoolCurriculumInter = (body) => {
    const SQLQuery = `SELECT *,curriculum_inter.curriculum as curriculum  from school_curriculum_inter JOIN curriculum_inter ON school_curriculum_inter.curriculum_inter_id = curriculum_inter.id`;
    return dbPool.execute(SQLQuery);
  }

  //LanguageOfInstrcution
  const getLanguageInter = () => {
    const SQLQuery = ` SELECT * FROM language_inter`;
    return dbPool.execute(SQLQuery);
  }

  const createSchoolLanguageInter = (body) => {
    const SQLQuery = `
      INSERT INTO school_language_inter (school_id, language_inter_id)
      VALUES (${body.school_id}, ${body.language_inter_id})
    `;
    return dbPool.execute(SQLQuery);
  };
  
  const deleteSchoolLanguageInter = (body) => {
    const SQLQuery = `
      DELETE FROM school_language_inter
      WHERE school_id = ${body.school_id}
    `;
    return dbPool.execute(SQLQuery);
  };
  
  const getSchoolLanguageInter = (body) => {
    const SQLQuery = `
      SELECT *, language_inter.language as language 
      FROM school_language_inter 
      JOIN language_inter ON school_language_inter.language_inter_id = language_inter.id
    `;
    return dbPool.execute(SQLQuery);
  };

  //school-inter-class

  const createSchoolInterClass = (body) => {
    const { school_id, average, maximum } = body;
  
    const SQLQuery = `
      INSERT INTO school_inter_class (school_id, average, maximum) 
      VALUES (${school_id}, ${average}, ${maximum})
    `;
  
    return dbPool.execute(SQLQuery);
  };

  const getSchoolInterClasses = (body) => {
    const {school_id} = body;
    const SQLQuery = `
      SELECT * FROM school_inter_class WHERE school_id = ${school_id}
    `;
  
    return dbPool.execute(SQLQuery);
  };

  const updateSchoolInterClass = (body) => {
    const { school_id, average, maximum } = body;
  
    const SQLQuery = `
      UPDATE school_inter_class 
      SET average = ${average}, maximum = ${maximum} 
      WHERE school_id = ${school_id}
    `;
  
    return dbPool.execute(SQLQuery);
  };
  

  const createSchoolInterExtracurricular = (body) => {
    const { school_id, extracurricular, sportActivity, sportTeam } = body;
    const SQLQuery = `INSERT INTO school_inter_extracurricular (school_id, extracurricular, sport_activity, sport_team) VALUES(${school_id}, '${extracurricular}', '${sportActivity}', '${sportTeam}')` ;
    return dbPool.execute(SQLQuery);
  }

  const updateSchoolInterExtracurricular = (body) => {
    const { school_id, extracurricular, sportActivity, sportTeam } = body;
    const SQLQuery = `UPDATE school_inter_extracurricular SET extracurricular = '${extracurricular}', sport_activity = '${sportActivity}', sport_team = '${sportTeam}' WHERE school_id = ${school_id}` 
    return dbPool.execute(SQLQuery);
  }

  const getSchoolInterExtracurricular = (body) => {
    const {school_id} = body;
    const SQLQuery = `SELECT * FROM school_inter_extracurricular where school_id = ${school_id}`
    return dbPool.execute(SQLQuery);

  }

  const createSchoolGovermentFees = (body) => {
    const {aschool_fees, amiscellaneous_fees,bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees, years, school_id} = body;
    const SQLQuery = `INSERT INTO goverment_fees (school_id,aschool_fees,amiscellaneous_fees,bschool_fees,bmiscellaneous_fees,cschool_fees,cmiscellaneous_fees,dschool_fees,dmiscellaneous_fees, years) VALUES (${school_id},${aschool_fees},${amiscellaneous_fees},${bschool_fees},${bmiscellaneous_fees},${cschool_fees},${cmiscellaneous_fees},${dschool_fees},${dmiscellaneous_fees},${years})`;
    return dbPool.execute(SQLQuery);
  }

  const updateSchoolGovermentFees = (body) => {
    const {aschool_fees, amiscellaneous_fees,bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees, years, school_id} = body;
    const SQLQuery = `UPDATE goverment_fees SET aschool_fees=${aschool_fees}, amiscellaneous_fees=${amiscellaneous_fees},years=${years}, bschool_fees=${bschool_fees}, bmiscellaneous_fees=${bmiscellaneous_fees},cschool_fees=${cschool_fees}, cmiscellaneous_fees=${cmiscellaneous_fees},dschool_fees=${dschool_fees}, dmiscellaneous_fees=${dmiscellaneous_fees} WHERE school_id = ${school_id}`;
    return dbPool.execute(SQLQuery);
  }

  const getSchoolGovermentFees = (body) => {
    const {school_id} = body;
    const SQLQuery = `SELECT * FROM goverment_fees WHERE school_id = ${school_id}`;
    return dbPool.execute(SQLQuery);
  }

  const getSchoolInterFees = (body) => {
    const {school_id} = body
    const SQLQuery = `SELECT * from school_inter_fees WHERE school_id = ${school_id}`;
    return dbPool.execute(SQLQuery);
  }

  const createSchoolInterFees = (body) => {
    const {school_id, term, type, age, grade, price} = body;
    const SQLQuery = `INSERT INTO school_inter_fees (school_id, term, type, age, grade, price) VALUES (${school_id}, ${term}, '${type}', '${age}', '${grade}', '${price}')`;
    return dbPool.execute(SQLQuery);
  }

  const deleteSchoolInterFees = (body) => {
    const {id} = body;
    const SQLQuery = ` DELETE FROM school_inter_fees WHERE id = ${id}`;
    return dbPool.execute(SQLQuery);
  }

  const updateSchoolLogo = (body) => {
    const {school_id, img_url} = body;
    const SQLQuery = `UPDATE schools SET logo = '${img_url}' WHERE id=${school_id}`;
    return dbPool.execute(SQLQuery);
  }

module.exports={
    createNewSchool,
    getSchoolById,
    setSchoolContact,
    getSchools,
    getSchoolsTotal,
    getElectiveList,
    checkElectiveList,
    deleteElectiveSchool,
    createElectiveSchool,
    getElectiveSchool,
    createPSLE,
    getPSLE,
    updatePSLE,
    getCCAsList,
    getSchoolCCAs,
    createSchoolCCAs,
    deleteSchoolCCAs,
    getDSATalentList,
    getSchoolDSAs,
    createSchoolDSAs,
    deleteSchoolDSAs,
    getCurriculumInter,
    createSchoolCurriculumInter,
    deleteSchoolCurriculumInter,
    getSchoolCurriculumInter,
    getLanguageInter,
    createSchoolLanguageInter,
    deleteSchoolLanguageInter,
    getSchoolLanguageInter,
    createSchoolInterClass,
    updateSchoolInterClass,
    getSchoolInterClasses,
    createSchoolInterExtracurricular,
    updateSchoolInterExtracurricular,
    getSchoolInterExtracurricular,
    findSchoolGoverment,
    findSchoolInternational,
    createSchoolGovermentFees,
    updateSchoolGovermentFees,
    getSchoolGovermentFees,
    createSchoolInterFees,
    getSchoolInterFees,
    deleteSchoolInterFees,
    updateSchoolLogo
}
