const express = require("express")
const User = require("../models/UserModel")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const tokenControl = require("../middleware/token")

UserRouter.post("/register", async(req,res) => {
  try {
    let savedUser = await User.create(req.body)
    res.status(200).send({status: true, message: `User ${savedUser.username} Created!`})
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})

UserRouter.post("/login", async(req, res) => {
  try {
    const {username, password} = req.body
    if(!username || !password || username === "" || password === ""){
      return res.status(404).send({status: false, message: 'Username and Password Required!'})
    }
    let enteredUser = await User.findOne({username})
    if(!enteredUser){
      return res.status(404).send({status: false, message: 'Username can not be found!'})
    }
    if(enteredUser.password !== password){
      return res.status(404).send({status: false, message: 'Password is not matching!'})
    }
let token_given=jwt.sign({username:enteredUser.username},process.env.JWTKEY,{expiresIn: "1h"})
res.status(200).send({status:true,message:`Login Successful, Welcome user ${username} ! `,token:token_given})

  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})

UserRouter.post("/resetPassword", async(req, res) => {
  try {
    let {username, password, newPassword} = req.body
    let userFromDb = await User.findOne({username})
    if(!userFromDb || userFromDb.password !== password){
      return res.status(404).send({status: false, message: 'Invalid Username or Password!'})
    }
    await User.findOneAndUpdate({username},{password: newPassword})
    res.status(200).send({status: true, message: 'Password changed!'})
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})

UserRouter.get("/getAll",tokenControl,async(req,res) => {
  try {
    let users = await User.find({})
    return res.status(200).send({status:true, message: 'User List', users: users})
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})

module.exports = UserRouter