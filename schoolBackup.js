const School = require("../models/school")
const Utils = require("../utils/")
const {updateValue} = new Utils()


// API FOR GETTING ALL THE school
exports.all = async(req, res)=>{
   try {
    const schools = await School.find()
    res.status(200).json(schools)
   } catch (error) {
    res.status(400).json("Could't fetch the school")
   }
}

// API FOR CREATING school
exports.create = async(req, res)=>{

    const {name, lga, subjects,classes, teachers,} = req.body

    
    const newschool = await new School({
        name,
        lga,
        subjects : [subjects],
        classes : [classes],
        teachers : [teachers]
    })

    try {
        await newschool.save()
        res.status(200).json(`${name} school added successfully`)
    } catch (error) {
        res.status(400).json("New school not added")
    }
}


// API FOR EDITING school
exports.edit = async(req, res)=>{
    const {subjects, name, subjectID} = req.body
    const parentID = req.params.id 

  const school = await School.findOne({_id:parentID})

  console.log(school)
   

    const c = school.subjects.push(subjects)
  
    await school.save()


} 

// API FOR REMOVING FIELD 

exports.removeItem = async(req, res)=>{
    const {subjects, classes, teachers, name, lga, subjectID} = req.body
    const parentID = req.params.id 
    const school = await School.findOne({_id:parentID})

    if(subjects){
        console.log(subjectID)
        const c = await School.findByIdAndUpdate(
            { _id: parentID },
            { $pull: { subjects: { _id: subjectID} } },
            { new: true }, 
        )
          console.log(c)
            
            res.status(200).json("I tem edited")
           
} 
 else if(classes){
    console.log("from classes field")
     
  
      const c = school.classes.push(classes)
    console.log(c)
      await school.save()
      res.status(200).json("item edited")

} else if(teachers){
    console.log("from teachers field")
     
  
    const c = school.teachers.push(teachers)
  console.log(c)
    await school.save()
    res.status(200).json("item edited")

} else if(name){
    const c = school.name = name
    console.log(c)
      await school.save()
      res.status(200).json("item edited")
}
else if(lga){
    const c = school.lga = lga
    console.log(c)
      await school.save()
      res.status(200).json("item edited")
}


}
  



// API FOR UPDATING school
exports.addItem = async(req, res)=>{
    const {subjects, classes, teachers, name, lga} = req.body
    const parentID = req.params.id 
    const school = await School.findOne({_id:parentID})

    if(subjects){
        console.log("from subject field")
          const c = school.subjects.push(subjects)
        
          await school.save()
          res.status(200).json("Item edited")
           
} 
 else if(classes){
    console.log("from classes field")
     
  
      const c = school.classes.push(classes)
    console.log(c)
      await school.save()
      res.status(200).json("item edited")

} else if(teachers){
    console.log("from teachers field")
     
  
    const c = school.teachers.push(teachers)
  console.log(c)
    await school.save()
    res.status(200).json("item edited")

} else if(name){
    const c = school.name = name
    console.log(c)
      await school.save()
      res.status(200).json("item edited")
}
else if(lga){
    const c = school.lga = lga
    console.log(c)
      await school.save()
      res.status(200).json("item edited")
}


}
  



// API FOR DELETING school
exports.delete = async(req, res)=>{
    
    const parentID = req.params.pid 
    const subjectID = req.params.sid 
    console.log(parentID, subjectID)
    try {

        School.updateOne({
            "_id": parentID
          },
          {
            "$pull": {
              "subjects": {
                "_id": subjectID
              }
            }
          })
      
        res.status(200).json(` deleted successfully`)
    } catch (error) {
        res.status(200).json(` not deleted successfully`)
    }
}

