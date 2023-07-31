/* eslint-disable indent */
const db = require('../models')
const User = db.user
const Contact = db.contact

const addContactsToUser = async (req, res) => {
  try {
    const { phone_no, permanent_address, current_address } = req.body
    const userId = req.params.userId

    const user = await User.findByPk(userId)
    console.log('useid', userId)
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found.' })
    }

    const contact = await Contact.create({ phone_no, permanent_address, current_address, userId })
    console.log('Contact', contact)
    res.status(200).json({ Message: 'Contacts added to user successfully.' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ errorMessage: 'Internal server error.' })
  }
}

// const addUsersToContact = async (req, res) => {
//   try {
//     const contactId = req.params.contactId
//     const { userIds } = req.body

//     const contact = await Contact.findByPk(contactId)

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found.' })
//     }

//     const users = await User.findAll({
//       where: { id: userIds }
//     })

//     if (users.length !== userIds.length) {
//       return res.status(404).json({ message: 'One or more users not found.' })
//     }

//     await contact.addUsers(users)

//     res.status(200).json({ message: 'Users added to the contact successfully.' })
//   } catch (error) {
//     console.error('Error:', error)
//     res.status(500).json({ message: 'Internal server error.' })
//   }
// }

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      include: {
        model: User
      }
    })
    res.status(200).json({ data: contacts })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ errorMessage: 'Internal server error.' })
  }
}

const deleteContact = async (req, res) => {
  try {
    const userId = req.params.userId
    const contactId = req.params.contactId

    // Check if the user exists before deleting the contact
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found.' })
    }

    const contact = await Contact.findOne({
      where: { id: contactId, userId }
    })

    if (!contact) {
      return res.status(404).json({ errorMessage: 'Contact not found.' })
    }

    await contact.destroy()

    res.status(200).json({ message: 'Contact deleted successfully.' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ errorMessage: 'Internal server error.' })
  }
}

const updateContact = async (req, res) => {
  try {
    const userId = req.params.userId
    const contactId = req.params.contactId
    const { phone_no, permanent_address, current_address } = req.body

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found.' })
    }

    const contact = await Contact.findOne({
      where: { id: contactId, userId }
    })

    if (!contact) {
      return res.status(404).json({ errorMessage: 'Contact not found.' })
    }

    contact.phone_no = phone_no
    contact.permanent_address = permanent_address
    contact.current_address = current_address

    // Save the updated contact to the database
    await contact.save()

    res.status(200).json({ message: 'Contact updated successfully.' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ errorMessage: 'Internal server error.' })
  }
}

module.exports = { addContactsToUser, getAllContacts, deleteContact,updateContact }
