
const jwt = require("jsonwebtoken");
require("dotenv").config();
//generating JWT token
exports.generateToken=(payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
//verifying JWT token
exports.verifyToken=(token)=>{

        return jwt.verify(token, process.env.JWT_SECRET);
};
   
