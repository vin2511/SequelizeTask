const express = require("express");
const { getEmp } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get('/',getEmp);

module.exports = userRouter;