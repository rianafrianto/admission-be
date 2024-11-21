const express = require("express");
const settingsModel =  require('../models/settings');

const getSettings = async(req, res) => {
    try{
        const [settings] = await settingsModel.getSettings();
        res.status(200).json({
            status: "success",
            data: settings[0],
          });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}

const saveSettings = async(req, res) => {
    const data = req.body.data;
    try{
        const [settings] = await settingsModel.saveSettings({data});
        res.status(201).json({
            status: "success",
            data: settings[0],
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}


module.exports = {
    getSettings,
    saveSettings
}