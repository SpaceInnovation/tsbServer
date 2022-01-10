
// How to use cloudinary

// import cloudinary, make sure you have installed the cloudinary dependency. Then require it
const cloudinary = require('cloudinary')
require('dotenv').config()

// now create a config, what this does is basically to register our credentials with the cloudinary dependency, and this credentials we got them when we registered our cloudinary acc
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

// after configuration, we have to set up a function which we will export into any module that will need to use the services of cloudinary

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result)=>{
            console.log(result)
            resolve({
                url : result.url,
                id : result.public_id
            })
        }, {
            resource_type : "auto",
            folder : folder
        } )
    })
}

module.exports = uploads