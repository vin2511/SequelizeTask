const express = require ("express");
const { addUser,getUser,getById,deleteUser,updateUser, loginUser,queryUser, getByName } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post('/add',addUser);
userRouter.post('/login',loginUser)
userRouter.get('/get',getUser);
userRouter.get('/getbyid',getById);
userRouter.delete('/:id',deleteUser);
userRouter.patch('/update/:id',updateUser)

userRouter.get("/query",queryUser)
userRouter.get("/getbyname",getByName)
module.exports = userRouter;