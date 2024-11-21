const express = require("express");

const areasModels = require('../models/areas')

const getAllAreas = async(req, res) => {
    try{
        const [areas] = await areasModels.getAllAreas();
        res.status(200).json({
          status: "success",
          data: areas,
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
    getAllAreas
}