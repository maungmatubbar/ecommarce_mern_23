import express from "express";// package.json type=module so we write import
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categorRoutes from './routes/categoryRoute.js'
import cors from 'cors';
// Config env;
dotenv.config();

//const express = require('express'); 
//const colors = require('colors');

//Database config
connectDB();

//rest object
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));


//REST API
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categorRoutes);
app.get('/',(req,res)=>{
    res.send({
        message: "Welcome to ecommerce app"
    });
});


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running mode ${process.env.DEV_MODE} port on ${PORT}`.bgBlue.white);
});