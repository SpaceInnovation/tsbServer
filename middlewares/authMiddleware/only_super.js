
const only_super = (req, res, next)=>{

    if(req.user.role !== "super") return res.status(400).json("Unauthorize request, access denied")

    next()
}

module.exports = only_super