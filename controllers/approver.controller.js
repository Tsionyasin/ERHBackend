const User = require('../models/user.model');
const Approver = require('../models/approver.model');
const Admin = require('../models/admin.model');
const Upload = require('../models/upload.model');


exports.createApproverProfile = async (req, res) => {

   const name = req.params.name;
   const { firstname, lastname, email, under, department, profilepicture, academiclevel, year } = req.body;

   if (!firstname) {
      return res.status(401).json({
         status: 'fail',
         message: 'please provide firstname'
      })

   }

   if (!lastname) {
      return res.status(401).json({
         status: 'fail',
         message: 'please provide lastname'
      })

   }


   if (!email) {
      return res.status(401).json({
         status: 'fail',
         message: 'please provide email'
      })
   }

   if (!gender) {
      return res.status(401).json({
         status: 'fail',
         message: 'please provide your gender'
      })
   }


   const user = await User.findOne({ name });

   if (user.role === "approver") {


      if (user.Approver) {
         return res.status(400).json({
            status: 'fail',
            message: 'user exists'
         })
      }

      let newApprover = new Approver({  firstname, lastname, email, gender, profilepicture, under, department, academiclevel, year });


      newApprover.user = user._id;
      user.Approver = newApprover._id;

      const admin = await Admin.findOne({name });

      newApprover.admin = admin.name;
      admin.client = newApprover.name;

      const dep = await Department.findOne({department});
      newApprover.dep = dep.department;
      dep.department= newApprover.dep

      await user.save();
      await newApprover.save();
      await admin.save();

      res.status(200).json({
         status: 'success',
         message: 'Profile successfully created'
      })
   }

}


exports.getApproverProfile = async (req, res) => {
   const users = await User.find({}).populate('approver');
   res.json({ users })
}

exports.getUpload = async (req, res) => {
   const upload = await Upload.find({});
   res.json({upload})

}
