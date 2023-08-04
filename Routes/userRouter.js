const express = require("express");
const { hashPasswordMiddleware } = require("../Middleware/hashPassword");

  
const { userRegistration,userLogin } = require("../Controller/User/UserAuth");
 
const UserRouter = express.Router();

UserRouter.post("/register", hashPasswordMiddleware, userRegistration);
UserRouter.post("/login",userLogin)


module.exports = {
    UserRouter
}