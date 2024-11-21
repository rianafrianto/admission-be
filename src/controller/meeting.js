require('dotenv').config()
const express = require("express");
const axios = require('axios');

const getZoomToken = async(req, res) => {
    try{
        const response = await axios.post('https://zoom.us/oauth/token?grant_type=account_credentials&account_id='+process.env.ZOOM_ACCOUNT_ID,null,{
            auth:{
                username:process.env.ZOOM_CLIENT_ID,
                password:process.env.ZOOM_CLIENT_SECRET
            }
        })
        return response.data.access_token
    }catch(err){
        console.log(err)
    }
}

const createZoomMeeting = async(req, res) => {
    const {topic, type, start_time, duration, timezone, agenda} = req.body.data;
    console.log({topic, type, start_time, duration, timezone, agenda})
    const token = await getZoomToken();
    console.log(token);
    try{
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {topic, type, start_time, duration, timezone, agenda},{
            headers: {      
                Authorization: `Bearer ${token}`}
        });
        res.status(200).json({
            status: "success",
            data: response.data,
          });
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Unable to create a meetings.",
            error: error.message,
          });
    }
    
}

module.exports = {
    getZoomToken,
    createZoomMeeting
}