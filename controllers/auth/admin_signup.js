
const Admin = require('../../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortId = require('shortid')
const Utils = require('../../utils')
const {isSuper, asignValue} = new Utils()


require('dotenv').config()

// api for creating the an admin
exports.create = async (req, res)=>{

    let {email, password, role} = req.body
    
    if(!email ||  !password) return res.status(400).json("All fields are required")

    username = email.slice(0, 5) + shortId.generate()
    username = username.slice(0, 6)
    
    const allAdmin = (await Admin.find()).length
   
    if(allAdmin > 0){
        const user = await Admin.findOne({email})

        if(user) return res.status(400).json('Email already exist!')

        const hashed_password = await bcrypt.hash(password, 10)

        const newAdmin = await new Admin({
            email,
            password : hashed_password,
            username,
            role
        })
    
        const saved_user = await newAdmin.save()
       // We didn't implement the token because they will get the token when they login
        res.json("Registration successful")
        console.log(saved_user)
      
    } else{
        const hashed_password = await bcrypt.hash(password, 10)

        const newAdmin = await new Admin({
            email,
            password : hashed_password,
            username,
            role : "super"
        })
    
        const saved_user = await newAdmin.save()
        const token = await jwt.sign({id: saved_user._id, role : saved_user.role}, process.env.JWT_SECRET)
        
        res.json({token, user : saved_user, message:"Registration successful"})
        console.log(saved_user)
    }

    

    

}

// API FOR EDITING AN ADMIN
exports.edit =  async(req, res)=>{
    const id = await Admin.findById(req.params.id)
    const {username, role} = req.body
    
    try {
        if(isSuper(req)){
            id.username = await asignValue(username, id.username)
            id.role = await asignValue(role, id.role)
            await id.save()
            res.status(200).json("Admin updated by Super Admin")
        } else{
            id.username = await asignValue(username, id.username)
            await id.save()
            res.status(200).json("Only username updated ")
        }
        
        
    } catch (error) {
        res.status(400).json("Admin not updated successfully")
    }
    
}

// API FOR DELETING AN ADMIN
exports.delete = async(req, res)=>{
    const admin_id = req.params.id
 
    try {
        if(isSuper(req)){
            await Admin.findByIdAndDelete(admin_id)
            res.status(200).json(`Admin deleted successfully`)
        } 
        
    } catch (error) {
        res.status(400).json("You are not authorised to delete this.")
    }

}

// API FOR GETTING A SINGLE ADMIN 
exports.detail = async(req, res)=>{
    const admin_id = req.params.id
    try {
        const id = await Admin.findById(admin_id)
        res.status(200).json(id)
    } catch (error) {
        res.status(400).json(`Admin with ${admin_id.name} not found`)
    }

}

// API FOR GETTING ALL ADMIN 
exports.allAdmin = async(req, res)=>{
    try {
        const admins = await Admin.find().sort({createdAt:-1})
        res.status(200).json(admins)
    } catch (error) {
        res.status(400).json("Admin not found!")
    }
}

