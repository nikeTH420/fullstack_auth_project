const User=require('../models/userModel');
//find user by email
exports.findUserByEmail=async(email)=>{
    return await User.findOne({ email });
};
//create new user
exports.createUser=async(userData)=>{
    const user=new User(userData);
    return await user.save();
};