const express = require('express')
const { signupUser, getAllUser, getById, deleteUser, updateUser, loginUser, logoutUser, queryUser, getByName, assignTasksToUser, getAllUsersWithContacts } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

userRouter.get('/getallusers', getAllUser)
userRouter.get('/getbyid/:id', getById)
userRouter.get('/users-with-contacts', getAllUsersWithContacts)

userRouter.delete('/deleteuser/:id', deleteUser)
userRouter.put('/updateuser/:id', updateUser)

userRouter.post('/assignTasksToUser', assignTasksToUser)
userRouter.get('/query', queryUser)
userRouter.get('/getbyname', getByName)

module.exports = userRouter
