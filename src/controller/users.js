const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userModel = require("../models/users");

const SECRET_KEY = process.env.SECRET_KEY

const getAllUsers = async (req, res) => {
  try {
    const {search, offset} = req.query.data;
    const [users] = await userModel.getAllUsers({search, offset});
    const [totalUser] = await userModel.getUsersTotal({search});
    res.status(200).json({
      status: "success",
      data: users,
      total:totalUser[0].total
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve users.",
      error: error.message,
    });
  }
};


const createNewUser = async (req, res) => {
  const { password, ...userData } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...userData, password: hashedPassword };
    const [exist] = await userModel.checkUser(userData.email);
    if(exist.length>0){
        res.status(200).json({
            status: "failed",
            message: "user already exist",
          });
    }else{
        const [user] = await userModel.createNewUsers(newUser); 
         
        res.status(201).json({
            status: "success",
            data: user,
          });
    }
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create user.",
      error: error.message,
    });
  }
};

const authProvider = async (req, res) => {
  const {name, email,type, password, provider} = req.body;
  const [exist] = await userModel.checkUser(email);
  if(exist.length > 0){
    if(provider == exist[0].provider){
      const token = jwt.sign(
        {id:exist[0].id, email:exist[0].email, type:exist[0].type,provider:exist[0].provider},
        SECRET_KEY,
        {expiresIn:'24h'}
      )
        res.status(200).json({
            status: "success",
            data:exist[0],
            token
          });
    }else{
      res.status(200).json({
        status: "failed",
        message:'Wrong login method, this account using '+exist[0].provider+ ' method'
      });
    }
  }else{
    if(type == ''){
      res.status(200).json({
        status: "failed",
        message:'user is not exist'
      });
    }else{
      const { password, ...userData } = req.body;
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { ...userData, password: hashedPassword };
        const [exist] = await userModel.checkUser(userData.email);
        if(exist.length>0){
            res.status(200).json({
                status: "failed",
                message: "user already exist",
              });
        }else{
            const [user] = await userModel.createNewUsers(newUser);
            const token = jwt.sign(
              {id:user.id, email:user.email, type:user.type,provider:user.provider},
              SECRET_KEY,
              {expiresIn:'24h'}
            )  
            res.status(201).json({
                status: "success",
                data: user,
                token
              });
        }
        
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Failed to create user.",
          error: error.message,
        });
      }
  }
}
}

const loginUsers = async(req, res) => {
    const {email, password, provider} = req.body;
    const [exist] = await userModel.checkUser(email);
    if(exist.length > 0){
        const hashPassword = exist[0].password;
        const match = await bcrypt.compare(password,hashPassword);
        if(provider == exist[0].provider){
          if(match){
              const token = jwt.sign(
                {id:exist[0].id, email:exist[0].email, type:exist[0].type,provider:exist[0].provider},
                SECRET_KEY,
                {expiresIn:'24h'}
              )
                res.status(200).json({
                    status: "success",
                    data:exist[0],
                    token
                  });
            }else{
              res.status(200).json({
                status: "failed",
                message:'Password not match'
              });
            }
        }else{
          res.status(200).json({
            status: "failed",
            message:'Wrong login method, this account using '+exist[0].provider+ ' method'
          });
            
        }

    }else{
        res.status(200).json({
            status: "failed",
            message:'user is not exist'
          });
    }
}

const getUserWithID = async (req,res) => {
  const {id} = req.body;
  try{
    const [users] = await userModel.getUserByID(id);
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve users.",
      error: error.message,
    });
  }

}

module.exports = {
  getAllUsers,
  createNewUser,
  loginUsers,
  getUserWithID,
  authProvider
};
