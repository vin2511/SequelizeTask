/* eslint-disable no-trailing-spaces */
const express = require('express')

const contactRouter = express.Router()
const contactController = require('../controllers/contactController')
  
contactRouter.get('/getallcontacts', contactController.getAllContacts)
contactRouter.post('/users/:userId/contacts', contactController.addContactsToUser)
contactRouter.delete('/users/:userId/contacts/:contactId', contactController.deleteContact)
contactRouter.patch('/users/:userId/contacts/:contactId', contactController.updateContact)
module.exports = contactRouter
