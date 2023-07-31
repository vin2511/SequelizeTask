const db = require("../models");
const User = db.user;
const Contact = db.contact;


const addContact = async (req, res) => {
    try {
      const contactData = req.body;
      const contact = await Contact.create(contactData);
      res.status(201).json({ data: contact });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };


const addContactsToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const contactIds = req.body.contactIds;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ Message: "User not found." });
    }
  
    const contacts = await Contact.findAll({
      where: {
        id: contactIds,
      },
    });

    if (contacts.length !== contactIds.length) {
      return res.status(404).json({ Message: "One or more contacts not found." });
    }

    await user.addContacts(contacts);
    res.status(200).json({ Message: "Contacts added to user successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Message: "Internal server error." });
  }
};


const addUsersToContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const { userIds } = req.body;


    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    
    const users = await User.findAll({
      where: { id: userIds },
    });

    if (users.length !== userIds.length) {
      return res.status(404).json({ message: 'One or more users not found.' });
    }

    
    await contact.addUsers(users);

    res.status(200).json({ message: 'Users added to the contact successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.findAll();
      res.status(200).json({ data: contacts });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };


module.exports = {addContact, addContactsToUser,addUsersToContact,getAllContacts };
