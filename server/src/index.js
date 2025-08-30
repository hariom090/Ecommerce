


import express from "express"

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js';


dotenv.config({
    path: "./.env"
})

// const app = express()
const portName = process.env.PORT
connectDB()
.then(() =>{ app.listen( portName || 6000, () => {
    console.log(` Server is running at port: ${process.env.PORT}`);
})
})
.catch((err)=>{
     console.log("MONGO DB connection failed !!!", err);
})
   









