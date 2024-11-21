const express = require("express");
const bookingConsultationModel = require('../models/booking_consultation');

const createBookingConsultation = async(req,res) => {
    const data = req.body;
    try{
        const [booking_consultation] = await bookingConsultationModel.createBookingConsultation(data.data);
        res.status(201).json({
            status: "success",
            data:booking_consultation,
         });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create booking_consultation.",
            error: error.message,
        });
    }
}

const getMyConsultation = async(req, res) => {
    const data =req.body.data;
    try{
        const [consultation] = await bookingConsultationModel.getMyBookingConsultation(data);
        res.status(200).json({
            status: "success",
            data:consultation,
         });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create booking_consultation.",
            error: error.message,
        });
    }
}

const getAllConsultation = async(req, res) => {
    try{
        const [consultation] = await bookingConsultationModel.getAllBookingConsultation();
        res.status(200).json({
            status: "success",
            data:consultation,
         });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create booking_consultation.",
            error: error.message,
        });
    }
}

module.exports = {
    createBookingConsultation,
    getMyConsultation,
    getAllConsultation
}