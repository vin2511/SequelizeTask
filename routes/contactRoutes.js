const express = require('express');

const contactRouter =  express.Router();
const {addContact,addContactsToUser,addUsersToContact,getAllContacts} = require('../controllers/contactController');

contactRouter.get('/getcontact',getAllContacts);
contactRouter.post('/addcontact',addContact);
contactRouter.post('/addcontactuser',addContactsToUser);
contactRouter.post('/adduser',addUsersToContact);

module.exports = contactRouter;