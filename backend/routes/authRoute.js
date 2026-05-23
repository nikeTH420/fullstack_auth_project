const express = require("express");
const route = express.Router();
const userController = require("../controllers/authController");

route.post("/signup", userController.registerUser);
route.post("/register", userController.registerUser);
route.post("/login", userController.loginUser);

module.exports = route;