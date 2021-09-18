const mongoose = require("mongoose")

const Schema = mongoose.Schema;


require('mongoose-type-email');

const departmentSchema= new Schema({
  
   department:{
      type:String

   },

   approver:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Approver' 
      }
   ]
},
{
   timestamps: true
});

const Department = mongoose.model('Department', departmentSchema)
module.exports = Department
