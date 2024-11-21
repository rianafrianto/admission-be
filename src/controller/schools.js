const express = require("express");

const schoolsModel = require('../models/schools')
const crawlController = require('./crawl')

const createNewSchool = async(req, res) => {
    const {data} = req.body;
    try{
        const [schools] = await schoolsModel.createNewSchool(data);
        res.status(201).json({
            status: "success",
            data:schools,
         });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create schools.",
            error: error.message,
        });
    }
}

const getSchoolsById =  async(req,res) => {
    const id = req.body.id;
    try{
        const [school] = await schoolsModel.getSchoolById(id);
        // const [crawl] = await crawlController.crawlSchoolContact(school[0].slug);
        res.status(201).json({
            status: "success",
            data:school,
         });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
    }
}


const setSchoolContact = async(req,res) => {
    const {...body} = req.body;
    try{
        const [school] = await schoolsModel.setSchoolContact(body);
        res.status(201).json({
            status: "success",
            data:school,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
    }
}

const getSchools = async(req, res) => {
    const {offset,search} = req.query.data;
    try{
        const [school] = await schoolsModel.getSchools({offset,search});
        const [schoolTotal] = await schoolsModel.getSchoolsTotal({search});
        res.status(201).json({
            status: "success",
            data:school,
            total:schoolTotal[0].total
         });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
    }
}

const findSchool = async(req, res) => {
  const {schoolType, ageLevel} = req.body.data;
  if(schoolType == 0 || schoolType == '0'){
    try{
      const [schools] = await schoolsModel.findSchoolGoverment({schoolType,ageLevel})
      res.status(201).json({
        status: "success",
        data:schools,
     });
    }catch(error){
      console.log(error)
      res.status(500).json({
          status: "error",
          message: "Failed to create user.",
          error: error.message,
      });
    }
  }else{
    if(ageLevel == 1 || ageLevel == '1'){
      try{
        const from = 3;
        const to = 5;
        const [schools] = await schoolsModel.findSchoolInternational({schoolType,from,to})
        console.log({schoolType,from,to});
        res.status(201).json({
          status: "success",
          data:schools,
       });
      }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
      }
    }
    if(ageLevel == 2 || ageLevel == '2'){
      try{
        const from = 6;
        const to = 11;
        const [schools] = await schoolsModel.findSchoolInternational({schoolType,from,to})
        console.log({schoolType,from,to});
        res.status(201).json({
          status: "success",
          data:schools,
       });
      }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
      }
    }
    if(ageLevel == 3 || ageLevel == '3'){
      try{
        const from = 12;
        const to = 16;
        const [schools] = await schoolsModel.findSchoolInternational({schoolType,from,to})
        console.log({schoolType,from,to});
        res.status(201).json({
          status: "success",
          data:schools,
       });
      }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
      }
    }
    if(ageLevel == 4 || ageLevel == '4'){
      try{
        const from = 17;
        const to = 18;
        const [schools] = await schoolsModel.findSchoolInternational({schoolType,from,to})
        console.log({schoolType,from,to});
        res.status(201).json({
          status: "success",
          data:schools,
       });
      }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
      }
    }
    
  }
}

//ElectiveList

const getElectiveList = async(req, res) => {
    try{
        const [electiveCat] = await schoolsModel.getElectiveList();
        res.status(201).json({
            status: "success",
            data:electiveCat,
         });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
    }
}

const saveSchoolElective = async(req, res) => {
    try{
        const {id, ALP,LLP} = req.body.data;
        //ALP
        const [checkALP] = await schoolsModel.checkElectiveList({school_id:parseInt(id),type:0});
        if(checkALP.length > 0){
            await schoolsModel.deleteElectiveSchool({school_id:parseInt(id),type:0})
            ALP.forEach ( async elective => {
               const newALP = await schoolsModel.createElectiveSchool({school_id:parseInt(id),elective_id:elective.value,type:0})
                console.log(newALP);
            });
        }else{
            ALP.forEach ( async elective => {
                const newALP = await schoolsModel.createElectiveSchool({school_id:parseInt(id),elective_id:elective.value,type:0})
                 console.log(newALP);
             });
        }
        const [checkLLP] = await schoolsModel.checkElectiveList({school_id:parseInt(id),type:1});
        if(checkLLP.length > 0){
            await schoolsModel.deleteElectiveSchool({school_id:parseInt(id),type:1})
            LLP.forEach ( async elective => {
               const newLLP = await schoolsModel.createElectiveSchool({school_id:parseInt(id),elective_id:elective.value,type:1})
            });
        }else{
            LLP.forEach ( async elective => {
                const newLLP = await schoolsModel.createElectiveSchool({school_id:parseInt(id),elective_id:elective.value,type:1})
             });
        }
        res.status(201).json({
            status: "success",
            data:{school_id:parseInt(id), ALP,LLP},
         });
        

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        }); 
    }
}

const getElectiveSchool = async(req, res) => {
    const {id} = req.body.data;
    try{
        const [electiveSchool] = await schoolsModel.getElectiveSchool({school_id:id});
        res.status(201).json({
            status: "success",
            data:electiveSchool,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });  
    }
}

const savePSLEScore = async(req, res) => {
    const {school_id, year, af3,af2,af1,at3,at2,at1,nf3,nf2,nf1,nt3,nt2,nt1} = req.body.data;
    try{
        const [psle_check] = await schoolsModel.getPSLE({school_id});
        if(psle_check.length > 0){
            const [psle] = await schoolsModel.updatePSLE({school_id, year, af3,af2, af1, at3,at2, at1, nf3,nf2,nf1, nt3,nt2,nt1});
            res.status(201).json({
                status: "success",
                data:psle,
             });
        }else{
            const [psle] = await schoolsModel.createPSLE({school_id, year, af3,af2, af1, at3,at2, at1, nf3,nf2,nf1, nt3,nt2,nt1});
            res.status(201).json({
                status: "success",
                data:psle,
             });
        }
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });   
    }
}

const getPSLE = async(req, res) => {
    const {school_id} = req.body.data;
    try{
        const [psle] = await schoolsModel.getPSLE({school_id});
        res.status(201).json({
            status: "success",
            data:psle,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });  
    }
}

const getCCAsList = async(req, res) => {
    try{
        const [ccas] = await schoolsModel.getCCAsList();
        res.status(201).json({
            status: "success",
            data:ccas,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });  
    }
}

const saveSchoolCCAs = async(req, res) => {
    const {school_id, ccas} = req.body.data;
    const [checkCCAs] = await schoolsModel.getSchoolCCAs({school_id});
    try{
        if(checkCCAs.length > 0){
            const deleteCCAs = await schoolsModel.deleteSchoolCCAs({school_id});
            await ccas.map(async(ccasItem, index) => {
                const [school_ccas] =  await schoolsModel.createSchoolCCAs({school_id, ccas_id:ccasItem.value});
            }) 
            res.status(201).json({
                status: "success",
                data:{school_id, ccas},
             });
        }else{
            await ccas.map(async(ccasItem, index) => {
                const [school_ccas] =  await schoolsModel.createSchoolCCAs({school_id, ccas_id:ccasItem.value});
            }) 
            res.status(201).json({
                status: "success",
                data:{school_id, ccas},
             });
        }
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        }); 
    }
    
}

const getSchoolCCAs = async(req, res) => {
    const {school_id} = req.body.data;
    try{
        const [schoolCCAs] = await schoolsModel.getSchoolCCAs({school_id});
        res.status(201).json({
            status: "success",
            data:schoolCCAs,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        }); 
    }
}

//DSA

const getDSATalentList = async(req, res) => {
    try{
        const [dsa_talent] = await schoolsModel.getDSATalentList();
        res.status(201).json({
            status: "success",
            data:dsa_talent,
         });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create user.",
            error: error.message,
        });
    }
}

const saveSchoolDSAs = async (req, res) => {
    const { school_id, dsa_talents } = req.body.data;
  
    try {
      // Check existing DSAs for the school
      const [checkDSAs] = await schoolsModel.getSchoolDSAs({ school_id });
      if (checkDSAs.length > 0) {
        await schoolsModel.deleteSchoolDSAs({ school_id });
        await dsa_talents.map(async (dsaTalentItem, index) => {
            await schoolsModel.createSchoolDSAs({
              school_id,
              dsa_talent_id: dsaTalentItem.value,
            });
          })
          res.status(201).json({
            status: "success",
            data: { school_id, dsa_talents },
          });
      } else {
        // Create new DSAs directly
        await dsa_talents.map(async (dsaTalentItem, index) => {
            await schoolsModel.createSchoolDSAs({
              school_id,
              dsa_talent_id: dsaTalentItem.value,
            });
          })
          res.status(201).json({
            status: "success",
            data: { school_id, dsa_talents },
          });
        
      }
  
      
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to manage school DSAs.",
        error: error.message,
      });
    }
  };
  
  const getSchoolDSAs = async (req, res) => {
    const { school_id } = req.body.data;
  
    try {
      const [schoolDSAs] = await schoolsModel.getSchoolDSAs({ school_id });
      res.status(201).json({
        status: "success",
        data: schoolDSAs,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  };

  const getCurriculumInter= async(req,res)=> {
    try{
        const [curriculum_inter] = await schoolsModel.getCurriculumInter();
        res.status(200).json({
            status: "success",
            data: curriculum_inter,
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve school DSAs.",
            error: error.message,
          });
    }
  }

  const saveSchoolCurriculumInter = async(req,res) => {
    const {school_id, curriculum} = req.body.data;
    try{
    const [schoolCurriculum] = await schoolsModel.getSchoolCurriculumInter();
    if(schoolCurriculum.length > 0){
        await schoolsModel.deleteSchoolCurriculumInter({school_id});
        if(curriculum.length>0){
            await curriculum.map(async(item, index) => {
                await schoolsModel.createSchoolCurriculumInter({school_id,curriculum_inter_id:item.value})
            })
        }
    }else{
        if(curriculum.length>0){
            await curriculum.map(async(item, index) => {
                await schoolsModel.createSchoolCurriculumInter({school_id,curriculum_inter_id:item.value})
            })
        }
    }
    res.status(201).json({
        status: "success",
        data: curriculum,
      });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve school DSAs.",
            error: error.message,
          });
    }
  }

  const getSchoolCurriculumInter = async(req, res) => {
    const {school_id} = req.body.data;
    try{
        const [schoolCurriculumInter] = await schoolsModel.getSchoolCurriculumInter({school_id});
        res.status(200).json({
            status: "success",
            data: schoolCurriculumInter,
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve school DSAs.",
            error: error.message,
          });
    }
  }

  //LanguageInstruction

  const getLanguageInter = async(req, res) => {
    try{
        const [language_inter] = await schoolsModel.getLanguageInter();
        res.status(200).json({
            status: "success",
            data: language_inter,
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve school DSAs.",
            error: error.message,
          });
    }
  }

  const saveSchoolLanguageInter = async (req, res) => {
    const { school_id, language } = req.body.data; // Changed curriculum to language
    try {
      const [schoolLanguage] = await schoolsModel.getSchoolLanguageInter(); // Updated function name
      if (schoolLanguage.length > 0) {
        await schoolsModel.deleteSchoolLanguageInter({ school_id }); // Updated function name
        if (language.length > 0) {
          await language.map(async (item) => { // Changed curriculum to language
            await schoolsModel.createSchoolLanguageInter({ school_id, language_inter_id: item.value }); // Updated function name and variable
          });
        }
      } else {
        if (language.length > 0) {
          await language.map(async (item) => { // Changed curriculum to language
            await schoolsModel.createSchoolLanguageInter({ school_id, language_inter_id: item.value }); // Updated function name and variable
          });
        }
      }
      res.status(201).json({
        status: "success",
        data: language, // Changed curriculum to language
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  };
  
  const getSchoolLanguageInter = async (req, res) => { // Updated function name
    const { school_id } = req.body.data;
    try {
      const [schoolLanguageInter] = await schoolsModel.getSchoolLanguageInter({ school_id }); // Updated function name
      res.status(200).json({
        status: "success",
        data: schoolLanguageInter,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  };


  const saveSchoolInterClasses = async(req, res) => {
    const {school_id, average, maximum} = req.body.data;
    const [schoolInterClasses] = await schoolsModel.getSchoolInterClasses({school_id});
    if(schoolInterClasses.length > 0){
        try{
        await schoolsModel.updateSchoolInterClass({school_id,average,maximum});
        res.status(201).json({
            status: "success",
            data: {school_id, average, maximum},
          });
        }catch(error){
            console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
        }
    }else{
        try{
        await schoolsModel.createSchoolInterClass({school_id,average,maximum});
        res.status(201).json({
            status: "success",
            data: {school_id, average, maximum},
          });
        }catch(error){
            console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
        }
    }
  }

  const getSchoolInterClasses = async(req, res) => {
    const {school_id} = req.body.data;
    try{
        const [scholInterClasses] = await schoolsModel.getSchoolInterClasses({school_id});
        res.status(201).json({
            status: "success",
            data: scholInterClasses,
          });
    }catch(error){
            console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
        }
  }
  
  const saveSchoolInterExtracurricular = async(req, res) => {
    const {school_id, extracurricular, sportActivity, sportTeam} = req.body.data;
    try{
      const [checkExtracurricular] = await schoolsModel.getSchoolInterExtracurricular({school_id});
      if(checkExtracurricular.length > 0){
        const [saveExtracurricular] = await schoolsModel.updateSchoolInterExtracurricular({school_id, extracurricular, sportActivity, sportTeam});
        res.status(201).json({
          status: "success",
          data: {school_id, extracurricular, sportActivity, sportTeam},
        });
      }else{
        const [saveExtracurricular] = await schoolsModel.createSchoolInterExtracurricular({school_id, extracurricular, sportActivity, sportTeam});
        res.status(201).json({
          status: "success",
          data: {school_id, extracurricular, sportActivity, sportTeam},
        });
      }
    }catch(error){
      console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
      }
  }

  const getSchoolInterExtracurricular = async (req, res) => {
    const {school_id} = req.body.data;
    try{
      const [schoolExtracurricular] = await schoolsModel.getSchoolInterExtracurricular({school_id});
      res.status(201).json({
        status: "success",
        data: schoolExtracurricular,
      });
    }catch(error){
      res.status(201).json({
        status: "success",
        data: {school_id, extracurricular, sportActivity, sportTeam},
      });
    }
  }


  //FEES
  const saveSchoolGovermentFees = async(req,res) => {
    const {school_id, bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees,aschool_fees, amiscellaneous_fees, years} = req.body.data;
    try{
      const [check_school_fees] = await schoolsModel.getSchoolGovermentFees({school_id});
      if(check_school_fees.length > 0){
        try{
          const [save_fees] = await schoolsModel.updateSchoolGovermentFees({school_id, bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees,aschool_fees, amiscellaneous_fees, years});
          res.status(201).json({
            status: "success",
            data: {school_id, bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees,aschool_fees, amiscellaneous_fees, years},
          });
        }catch(error){
          console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
        }
      }else{
        try{
          const [save_fees] = await schoolsModel.createSchoolGovermentFees({school_id, bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees,aschool_fees, amiscellaneous_fees, years});
          res.status(201).json({
            status: "success",
            data: {school_id, bschool_fees, bmiscellaneous_fees,cschool_fees, cmiscellaneous_fees,dschool_fees, dmiscellaneous_fees,aschool_fees, amiscellaneous_fees, years},
          });
        }catch(error){
          console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
        }
      }
    }catch(error){
      console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
    }
  }

  const getSchoolGovermentFees = async(req, res) => {
    const {school_id} = req.body.data;
    try{
      const [school_fees] = await schoolsModel.getSchoolGovermentFees({school_id});
      res.status(200).json({
        status: "success",
        data: school_fees,
      });
    }catch(error){
      console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to retrieve school DSAs.",
              error: error.message,
            });
    }
  }

  //Inter Fees
  const createSchoolInterFees = async (req, res) => {
    const {school_id, term, type, age, grade, price}  = req.body.data;
    try{
      const [createSchoolFees] = await schoolsModel.createSchoolInterFees({school_id, term, type, age, grade, price});
      res.status(200).json({
        status: "success",
        data: {school_id, term, type, age, grade, price},
      });
    }catch(error){
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  }

  const getSchoolInterFees = async(req, res) => {
    const {school_id} = req.body.data;
    try{
      const [schoolFees] = await schoolsModel.getSchoolInterFees({school_id});
      res.status(200).json({
        status: "success",
        data: schoolFees,
      });
    }catch(error){
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  }

  const deleteSchoolInterFees = async(req, res) => {
    const {id} = req.body.data;
    try{
      const [deleteSchoolFees] = await schoolsModel.deleteSchoolInterFees({id});
      res.status(200).json({
        status: "success",
        data: {id},
      });
    }catch(error){
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve school DSAs.",
        error: error.message,
      });
    }
  }
  

module.exports={
    createNewSchool,
    getSchoolsById,
    setSchoolContact,
    getSchools,
    getElectiveList,
    saveSchoolElective,
    getElectiveSchool,
    savePSLEScore,
    getPSLE,
    getCCAsList,
    saveSchoolCCAs,
    getSchoolCCAs,
    getDSATalentList,
    saveSchoolDSAs,
    getSchoolDSAs,
    getCurriculumInter,
    saveSchoolCurriculumInter,
    getSchoolCurriculumInter,
    getLanguageInter,
    saveSchoolLanguageInter,
    getSchoolLanguageInter,
    saveSchoolInterClasses,
    getSchoolInterClasses,
    saveSchoolInterExtracurricular,
    getSchoolInterExtracurricular,
    findSchool,
    saveSchoolGovermentFees,
    getSchoolGovermentFees,
    createSchoolInterFees,
    getSchoolInterFees,
    deleteSchoolInterFees
}