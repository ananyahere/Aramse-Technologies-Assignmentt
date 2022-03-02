const router = require("express").Router()
const User = require('../model/user')
const isAuth = require('../middleware/isAuth')

router.post("/signup" , async (req,res) => {
  const user = new User(req.body)
  try{
    // create user instance
    await user.save()
    // generate auth & save user
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  }catch(e){
    console.log(e)
    res.status(400).send({error: e})
  }
})

router.post("/login", async (req, res) => {
  const {email,password} = req.body
 try{
  const user = await User.findByCredentials(email, password)
  // generate auth & save user
  const token = await user.generateAuthToken()
  res.status(200).send({user, token})
 }catch(e){
  console.log(e)
  res.status(400).send({error: e})
 } 
})

router.get("/dashboard", isAuth, (req, res) => {
  try{
    res.status(200).send("Welcome to Dashboard.")
  }catch(e){
    res.status(400).send({error: e})
  }
})

module.exports = router