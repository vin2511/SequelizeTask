/* eslint-disable no-useless-catch */
const dotenv = require('dotenv')
dotenv.config()

const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const db = require('../models')

const User = db.user
const Contact = db.contact
const Task = db.task

const signupUser = async (req, res) => {
  try {
    const postData = req.body

    if (!postData.phone_no || !postData.permanent_address) {
      return res.status(400).json({ error: 'Phone number and permanent address are required.' })
    }

    if (postData.length > 1) {
      var data = await User.bulkCreate(postData)

      for (const user of data) {
        await Contact.create({
          phone_no: postData.phone_no,
          permanent_address: postData.permanent_address,
          currrent_address: postData.currrent_address,
          User_id: user.id
        })
      }
    } else {
      const user = await User.create(postData)
      await Contact.create({
        phone_no: postData.phone_no,
        permanent_address: postData.permanent_address,
        current_address: postData.current_address,
        UserId: user.id
      })
      res.status(200).json({ Message: 'User added Successfully' })
    }
  } catch (error) {
    console.log('errro:', error)
    const Message = {}
    error.errors.forEach((error) => {
      switch (error.validatorKey) {
        case 'isAlpha':
          Message[error.path] = 'No special character or numerics allowed.'
          break
        case 'len':
          Message[error.path] = 'length must be min 2 and max 20.'
          break

        default:
          Message[error.path] = 'Validation error'
      }

      res.status(500).json({ data, Message })
    })
  }
}
const getAllUsersWithContacts = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Contact
      }
    })
    res.json(users)
  } catch (error) {
    console.log('erorr:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: 'USER not  found.' })
    }

    const hashedPassword = hash(password)

    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: 'invalid  email or password.' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SCRETE_KEY,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
  } catch (error) {
    console.log('Error In Login: ', error)
    res.status(500).json({ error: 'Inetrnal server error.' })
  }
}

function hash (value) {
  const hash = crypto.createHash('sha256')
  hash.update(value)
  return hash.digest('hex')
}

const logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty value and setting the expiration in the past
    res.cookie('token', '', { expires: new Date(0) })
    res.status(200).json({ message: 'Logout successful.' })
  } catch (error) {
    console.error('Error In Logout: ', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const getAllUser = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email'
        // "password",
        // [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]
      ]
      // group:['User.id','User.firstName','User.lastName','User.email']
    })
    const totalUsers = await User.count()
    res.status(200).json({ totalUsers, data })
  } catch (error) {
    console.error('error :', error)
    res.status(500).json({ Message: 'Internal server Error.' })
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({ Message: 'User Id is required.' })
    }
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email'
      // "password",
      ],
      include: {
        model: Contact,
        attributes: ['phone_no', 'permanent_address', 'current_address']
      }
    })

    if (!user) {
      return res.status(404).json({ Message: 'User not found.' })
    }
    res.status(200).json({ user })
  } catch (error) {
    console.log('Error is occur:', error)
    res.status(500).json({ Message: 'Internal sever error' })
  }
}

const getByName = async (req, res) => {
  try {
    const lastName = req.query.lastName

    const data = await User.findAll({
      where: {
        lastName
      }
    })

    res.status(200).json({ data })
  } catch (error) {
    console.log('Error is occur:', error)
    res.status(500).json({ Message: 'Internal sever error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({ Message: 'User Id not found.' })
    }

    const deletedUserCount = await User.destroy({ where: {
      id: id
    }
    })
    if (deletedUserCount === 0) {
      return res.status(404).json({ Message: 'User not found.' });
    }

    res.status(200).json({ Message: 'Data deleted.' })
  } catch (error) {
    console.log('Error is occur:', error)
    res.status(500).json({ Message: 'Internal sever error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const updatedData = req.body
    await User.update(updatedData, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ data: updatedData })
  } catch (error) {
    console.log('Error is occur:', error)
    res.status(500).json({ Message: 'Internal sever error' })
  }
}

const assignTasksToUser = async (userId, taskId) => {
  try {
    const user = await User.findByPK(userId)
    const users = await User.findAll({
      where: {
        id: userId
      }
    })

    if (user.length !== users.length) {
      throw new Error('One or more users not found.')
    }

    const task = await Task.findByPK(userId)
    if (!task) {
      throw new Error('Task not found.')
    }

    await user.setUsers(users)
  } catch (error) {
    throw error
  }
}

const queryUser = async (req, res) => {
  const data = await User.findAll({
    attributes: { exclude: ['lastName', 'updatedAt '] }
  })
  res.status(200).json({ data })
}

module.exports = {
  signupUser,
  getAllUsersWithContacts,
  loginUser,
  logoutUser,
  getAllUser,
  getById,
  deleteUser,
  updateUser,
  queryUser,
  getByName,
  assignTasksToUser
}
