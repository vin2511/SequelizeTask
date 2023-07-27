const {Users} = require ('../models/users');



const getUser = async(req,resp) =>{
    resp.status(200).json('hello')
       
}
const addUser =async(req,resp) =>{
   try {
    const {id,e_name,role_id,email} = req.body;
    const newUser =await Users.create({
        id:id,
        e_name:e_name,
        role_id:role_id,
        email:email  
    });
    resp.json(newUser);
   } catch (error) {
    console.log("Error in creating a user",error);
    resp.status(500).json({error:'failed to insert data.'})
   }
}

module.exports = {getUser,addUser}