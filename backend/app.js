const express = require("express");
const cors = require("cors");
const app=express();
const userRoutes=require("./routes/authRoute");
app.use(cors());
app.use(express.json());                    
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/users",userRoutes);
module.exports=app;