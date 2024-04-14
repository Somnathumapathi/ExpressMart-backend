const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const authRouter = express.Router()

authRouter.post("/api/signup", async (req, res) => {
try{
    const {name, email, password} = req.body
 const currentUser = await User.findOne({email})
 if(currentUser) {
    return res.status(400).json({msg:'Email already in use'})
 }
 const hashedPass = await bcrypt.hash(password, 7)
 let user = new User ({
    email, name, password: hashedPass,
 })
 user = await user.save()
 res.json(user)
} catch (e) {
    res.status(500).json({error: e.message})
}
})

authRouter.post('/api/login', async (req, res) => {
   try{
const {email,password} = req.body
const user = await User.findOne({email})
if(!user) {
   return res.status(400).json({msg: 'User does not exist'})
}
 const isMatch = await bcrypt.compare(password, user.password)
 if(!isMatch) {
   return res.status(400).json({msg: 'Wrong password'})
 }
const token = jwt.sign({id: user._id}, 'passwordKey')
res.json({token, ...user._doc})
   } catch (e) {
      res.status(500).json({error: e.message})
   }
})

authRouter.post('/isValidToken', async (req, res) => {
try {
   const token = req.header('x-auth-token')
   const verified = jwt.verify(token, 'passwordKey')
   if(!verified) return res.json(false)
   const user = User.findById(verified.id)
if(!user) return res.json(false)
return res.json(true)
} catch (e) {
   res.status(500).json({error: e.message})
}
})

authRouter.get('/', auth, async (req, res) => {
   const user = await User.findById(req.user)
   res.json({...user._doc, token : req.token})
})

module.exports = authRouter