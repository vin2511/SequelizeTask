const express = require ('express');
const userRouter = express.Router();
const {getUser,addUser} = require('../controllers/userController');


userRouter.get('/get',getUser);
userRouter.post('/add',addUser);

module.exports = {userRouter};
  