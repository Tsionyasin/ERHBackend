const Department = require('../models/department.model');


exports.GetDepartment =(req, res)=> {
   Department.find()
  .then(department => res.json(department))
  .catch(err => res.status(400).json('Error:' + err));
}
exports.GetDepartmentById = async( req, res) => {
  const id = req.params.id
  Department.findById(id)
  .then(department => res.json(department))
  .catch(err => res.status(400).json('Error:'+ err));
}


// add department

exports.addDepartment = async (req, res) => {
   const {department}= req.body;
 
   if (!department) {
     return res.status(401).json({
       status: 'fail',
       message: 'please provide department'
     })
   }

   const dep = await Department.findOne({ department });

   if (dep) {
      return res.status(400).json({
        status: 'fail',
        message: 'department existes'
      })
    }

 
  
   let newDep = new Department({ department});
 
   
 
   await newDep.save().then(() => {
 
     return res.status(200).json({
       status: 'succes',
       message: 'registration successful'
 
     })
 
   })
 }
 
 