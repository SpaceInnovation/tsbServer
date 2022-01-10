
const Admin = require('../../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../../middlewares/authMiddleware/auth')

require('dotenv').config()

 exports.signin = async (req, res)=>{

    let {email, password} = req.body
   
    if(!email || !password) return res.status(400).json("All fields are required")

    const user = await Admin.findOne({email})
    if(!user) return res.status(400).json('Email doesns\'t exist!')

    console.log(user.password)
   const isMatch = await bcrypt.compare(password, user.password)
   console.log(isMatch)
   if(!isMatch) return res.status(400).json("Password doesns\'t match")

    const token = await jwt.sign({id : user._id, username : user.username, role : user.role}, process.env.JWT_SECRET)

    res.json({token, user, message:"Login successful"})
  
}

exports.authen_user = Auth, async(req, res)=>{
   try {
    const userId = await req.user.id
    const user = await User.findById(userId)
    .select('-password')
    res.json(user)
   } catch (error) {
       res.status(400).json('Error found!')
   }
}

