const express = require("express");
const bookingTourModel = require('../models/booking_tour');

const createBookingTour = (req, res) => {
    const data = req. body;
    try{
        const booking = bookingTourModel.createBookingTour(data);
        res.status(201).json({
            status: "success",
            data:booking,
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

const getAllBookingTour = (req, res) => {
    try{
        const [booking] = bookingTourModel.getAllBookingTour();
        res.status(200).json({
            status: "success",
            data:booking,
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

const getBookingTourByUserId = (req, res) => {
    const data = req.body;
    try{
        const [booking] = bookingTourModel.getBookinTourByUserId(data);
        res.status(200).json({
            status: "success",
            data:booking,
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
    createBookingTour,
    getAllBookingTour,
    getBookingTourByUserId
}