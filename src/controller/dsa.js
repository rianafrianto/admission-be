const express = require("express");

const dsaModels = require('../models/dsa')

const getAllDsa = async(req, res) => {
    try{
        const [data] = await dsaModels.getDsa();
        res.status(200).json({
          status: "success",
          data: data,
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}


module.exports={
    getAllDsa
}