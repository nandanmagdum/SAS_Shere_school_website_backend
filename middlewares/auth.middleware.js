const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json("Token absent");
    }
    const isValidToken = await jwt.verify(token,process.env.jwt_key );
    if(!isValidToken){
        return res.status(401).json("Token expired !");
    }
    req._id = isValidToken._id;
    req.role = isValidToken.role;
    if(req.role != "student"){
        req.email = isValidToken.email;
    }
    next();
}

const filterAuth = async(req, res, next) => {
    if(req.path.startsWith("/auth")) {
        next();
    }
    else {
        return auth(req, res, next);
    }
}

const isAdminMiddleware = async(req, res, next) => {
    if(req.role === 'admin'){
        next();
    }
    else {
        res.status(401).json("Only admin can enter this route ! You don't have necessary permissions !");
    }
}

const isStaffMiddleware = async(req, res, next) => {
    if(req.role === "staff" || req.role === "admin"){
        next();
    } else {
        res.status(401).json("Only admin and staff can enter this route ! You don't have necessary permissions !");
    }
}

module.exports = {
    auth,
    filterAuth,
    isAdminMiddleware,
    isStaffMiddleware
}