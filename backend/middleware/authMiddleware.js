const {verifyToken}=require('../utils/jwt');
//verify user token
exports.verifyUser=(req, res, next) => {
    try{
         const authHeader = req.headers.authorization;
    //checking if token is provided
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    //remove Bearer
    const token = authHeader.split(" ")[1];
    //verifying token
    const decoded = verifyToken(token);
    //store user data in request object
    req.user = decoded;
    next();
    }
    catch(error){
        res.status(401).json({ message: "Invalid token" });
    }
   
}