const Status = require('../models/status')


// API FOR GETTING ALL THE statusS
exports.all = async(req, res)=>{
   try {
    const allStatus = await Status.find()
    res.status(200).json(allStatus)
   } catch (error) {
    res.status(400).json("Could't fetch the status")
   }
}

// API FOR CREATING status
exports.create = async(req, res)=>{

    const {name} = req.body

    const status = await Status.findOne({name})

    if(status) return res.status(400).json(`${name} status already exist.`)

    const newstatus = await new Status({
        name
    })

    try {
        await newstatus.save()
        res.status(200).json(`${name} status added successfully`)
    } catch (error) {
        res.status(400).json("New status not added")
    }
}


// API FOR EDITING status
exports.edit = async(req, res)=>{
    const id = await Status.findOne({_id:req.params.id})
    const {name} = req.body

    try {
        id.name = name
        await id.save()
        res.status(200).json(`${name} edited successfully`)
    } catch (error) {
        res.status(200).json(`Couldn't edit ${name} `)
    }


}

// API FOR DELETING status
exports.delete = async(req, res)=>{
    try {

        const id = await Status.findByIdAndDelete(req.params.id)
        const item_deleted = id.name
        res.status(200).json(`${item_deleted} deleted successfully`)
    } catch (error) {
        res.status(200).json(`${item_deleted} not deleted successfully`)
    }
}

