const express = require("express");
const mongoose = require("mongoose");
const annoucementModel = require("../models/announcement.model.js");

const createAnnoucementController = async(req, res) => {
    const data = req.body;
    data.createdBy = req._id
    try {
        const newData = await annoucementModel.create(data);
        if(!newData){
            return res.status(400).json("Error creating new announcement");
        }
        return res.status(200).json(newData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const editAnnoucementController = async(req, res) => {
    const data = req.body;
    try {
        const updatedData = await annoucementModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedData){
            return res.status(400).json("Error updating the data");
        }
        return res.status(200).json(updatedData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const deleteAnnoucementController = async(req, res) => {
    const id = req.params.id;
    try {
        const deletedData = await annoucementModel.findOneAndDelete({_id: id});
        if(!deletedData){
            return res.status(400).json("Error deleting the data");
        }
        return res.status(200).json("Data deleted Succesfully !");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const getAllAnnouncementController = async(req, res) => {
    try {
       const allData = await annoucementModel.find();
       if(!allData) {
            return res.status(400).json("Error getting all annoucenemts");
       }
       return res.status(200).json(allData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const getAnnouncementController = async(req, res) => {
    const id = req.params.id;
    try {
       const data = await annoucementModel.findOne({_id: id});
       if(!data) {
            return res.status(400).json("Error getting annoucenemt");
       }
       return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    createAnnoucementController,
    editAnnoucementController,
    deleteAnnoucementController,
    getAllAnnouncementController,
    getAnnouncementController
}