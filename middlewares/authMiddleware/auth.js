const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = async (req, res, next) => {
    // get the token
    let token;

   if(req.headers.authorization){
       token = req.headers.authorization.split(" ")[1]
   } else{
    return res.status(501).json('No token found, access denied')
   }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        
        

    } catch (error) {
        res.status(400).json('We can\'t verify the token found!')
    }
    return next()
}


module.exports = auth

