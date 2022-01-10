const Subject = require('../models/subject')


// API FOR GETTING ALL THE subject
exports.all = async(req, res)=>{
   try {
    const subjects = await Subject.find({})
    res.status(200).json(subjects)
   } catch (error) {
    res.status(400).json("Could't fetch the subject")
   }
}

// API FOR CREATING subject
exports.create = async(req, res)=>{

    const {name} = req.body

    const subject = await Subject.findOne({name})

    if(subject) return res.status(400).json(`${name} subject already exist.`)

    const newSubject = await new Subject({
        name
    })

    try {
        await newSubject.save()
        res.status(200).json(`${name} subject added successfully`)
    } catch (error) {
        res.status(400).json("New subject not added")
    }
}


// API FOR EDITING subject
exports.edit = async(req, res)=>{
    const id = await Subject.findOne({_id:req.params.id})
    const {name} = req.body
    console.log(name)
    try {
        id.name = name
        await id.save()
        res.status(200).json(`${name} edited successfully`)
    } catch (error) {
        res.status(400).json(`Couldn't edit ${name} `)
    }


}

// API FOR DELETING subject
exports.delete = async(req, res)=>{
    try {

        const id = await Subject.findByIdAndDelete(req.params.id)
        const item_deleted = id.name
        res.status(200).json(`${item_deleted} deleted successfully`)
    } catch (error) {
        res.status(200).json(`${item_deleted} not deleted successfully`)
    }
}

