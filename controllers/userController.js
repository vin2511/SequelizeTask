const userModel = require('../models/empModel');

const getEmp = async(req,res) =>{
    try {
        let emp = await userModel.findAll();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getEmp
}