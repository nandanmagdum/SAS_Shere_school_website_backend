const express = require("express");
const mongoose = require("mongoose");
const marksheetModel = require("../models/marksheet.model.js");

const createMarksheetController = async(req, res) => {
    const data = req.body;
    data.createdBy =  req._id;
    
    // calculate student obtained marks
    let obtained_marks = 0;
    for(let i = 0; i < data.subject_obtained_marks.length ; i++){
        obtained_marks += data.subject_obtained_marks[i];
    }

    // calculate total marks
    let total_marks = 0;
    for(let i=0; i< data.subject_total_marks.length; i++){
        total_marks += data.subject_total_marks[i];
    }
    // calculate percentage
    const result = (obtained_marks / total_marks) * 100;
    const percentage = (Math.round(result*100) / 100);

    data.total_marks = total_marks;
    data.obtained_marks = obtained_marks;
    data.percentage = percentage;
    console.log(data);
    try {
        const newMarksheet = await marksheetModel.create(data);
        if(!newMarksheet){
            return res.status(400).json("Error creating marksheet");
        }
        return res.status(200).json(newMarksheet);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const updateMarksheetController = async(req, res) => {
    const data = req.body;
    // calculate student obtained marks
    let obtained_marks = 0;
    for(let i = 0; i < data.subject_obtained_marks.length ; i++){
        obtained_marks += data.subject_obtained_marks[i];
    }

    // calculate total marks
    let total_marks = 0;
    for(let i=0; i< data.subject_total_marks.length; i++){
        total_marks += data.subject_total_marks[i];
    }
    // calculate percentage
    const result = (obtained_marks / total_marks) * 100;
    const percentage = (Math.round(result*100) / 100);

    data.total_marks = total_marks;
    data.obtained_marks = obtained_marks;
    data.percentage = percentage;
    console.log(data);
    try {
        const updatedMarksheet = await marksheetModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedMarksheet){
            return res.status(400).json("Error updating the marksheet");
        }
        return res.status(200).json(updatedMarksheet);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const deleteMarksheetController = async(req, res) => {
    const id = req.params.marksheetID;
    try {
        const deletedSheet = await marksheetModel.deleteOne({_id: id});
        if(!deletedSheet){
            return res.status(400).json("Error deleting the marksheet");
        }
        return res.status(200).json("Marksheet deleted successfully !");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const getAllMarksheetController = async(req, res) => {
    try {
        const allMarksheets = await marksheetModel.find();
        if(!allMarksheets){
            return res.status(400).json("Error getting all marksheets");
        }
        return res.status(200).json(allMarksheets);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const getMarksheetController = async(req, res) => {
    const id = req.params.marksheetID;
    try {
        const marksheet = await marksheetModel.findById(id);
        if(!marksheet){
            return res.status(400).json("Error getting marksheet");
        }
        return res.status(200).json(marksheet);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const getMarksheetOfClassController = async(req, res) => {
    const classID = req.params.classID;
    const id = parseInt(classID);
    console.log(typeof classID, typeof id);
    try {
        const classMarksheets = await marksheetModel.find({class: id});
        if(!classMarksheets){
            return res.status(400).json("Error getting class marksheets");
        }
        return res.status(200).json(classMarksheets);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    createMarksheetController,
    updateMarksheetController,
    deleteMarksheetController,
    getAllMarksheetController,
    getMarksheetController,
    getMarksheetOfClassController
};