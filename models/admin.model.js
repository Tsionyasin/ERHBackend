const mongoose = require("mongoose")

const Schema = mongoose.Schema;

require('mongoose-type-email');

const AdminSchema = new Schema ({
    username:{
        type:String,
    },
    name:{
       type:String,
       required: true
    },
    profilepicture:{
        type:String
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
  
    email:{
        type: mongoose.SchemaTypes.Email,
        required: true
   },
    under :{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    students: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]

}, {
    timestamps: true
})
AdminSchema.index({name:"text"})
const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
