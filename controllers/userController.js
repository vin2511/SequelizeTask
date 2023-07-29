const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
var db = require("../models");

var User = db.user;
var Contact = db.contact;
var Task = ad.task

var addUser = async (req, res) => {
  try {
    const postData = req.body;

    if (!postData.phone_no || !postData.permanent_address) {
      return res.status(400).json({ error: 'Phone number and permanent address are required.' });
    }

    if (postData.length > 1) {
      var data = await User.bulkCreate(postData);
      
      for (const user of data) {
        await Contact.create({
          phone_no: postData.phone_no,
          permanent_address: postData.permanent_address,
          currrent_address: postData.currrent_address,
          User_id: user.id,
        });
      }
    } else {
      var user = await User.create(postData);
      await Contact.create({
        phone_no: postData.phone_no,
        permanent_address: postData.permanent_address,
        current_address: postData.current_address,
        UserId: user.id,
      });
      res.status(200).json({ data: data });
    }
  } catch (error) {
    console.log("errro:", error);
    let Message = {};
    error.errors.forEach((error) => {
      switch (error.validatorKey) {
        case "isAlpha":
          Message[error.path] = "No special character or numerics allowed.";
          break;
        case "len":
          Message[error.path] = "length must be min 2 and max 20.";
          break;

        default:
          Message[error.path] = "Validation error";
      }

      res.status(500).json({ data: data, Message: Message });
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ wher: { email } });

    if (!user) {
      return res.status(404).json({ error: "USER not  found." });
    }

    const hashedPassword = hash(password);

    if (hashedPassword != user.password) {
      return res.status(401).json({ error: "invalid  email or password." });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SCRETE_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token });
  } catch (error) {
    console.log("Error In Login: ", error);
    res.status(500).json({ error: "Inetrnal server error." });
  }
};

function hash(value) {
  const hash = crypto.createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
}

//const userAlongWithTask = 

const getUser = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        //"password",
        // [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]
      ],
      include:{model:Contact,
      attributes:["phone_no","permanent_address","current_address"]
      }
      //group:['User.id','User.firstName','User.lastName','User.email']
    });
    const totalUsers = await User.count();
    res.status(200).json({ totalUsers: totalUsers, data: data });
  } catch (error) {
    console.error("error :", error);
    res.status(500).json({ Message: "Internal server Error." });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ Message: "User Id is required." });
    }
    const data = await User.findAll({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        //"password",
        ],
      include:{model:Contact,
      attributes:["phone_no","permanent_address","current_address"]
      }
    });

    res.status(200).json({ data: data });
  } catch (error) {
    console.log("Error is occur:", error);
    res.status(500).json({ Message: "Internal sever error" });
  }
};

const getByName = async (req, res) => {
  try {
    const lastName = req.query.lastName;

    const data = await User.findAll({
      where: {
        lastName: lastName,
      },
    });

    res.status(200).json({ data: data });
  } catch (error) {
    console.log("Error is occur:", error);
    res.status(500).json({ Message: "Internal sever error" });
  }
};
const deleteUser = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ Message: "data deleted." });
};

const updateUser = async (req, res) => {
  const updatedData = req.body;
  const data = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: updatedData });
};

const queryUser = async (req, res) => {
  const data = await User.findAll({
    attributes: { exclude: ["lastName", "updatedAt "] },
  });
  res.status(200).json({ data: data });
};

module.exports = {
  addUser,
  loginUser,
  getUser,
  getById,
  deleteUser,
  updateUser,
  queryUser,
  getByName,
};
