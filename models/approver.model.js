const mongoose = require("mongoose")

const Schema = mongoose.Schema;


require('mongoose-type-email');

const approverSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    
   
    institute:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Admin'

    },
  
    profilepicture:{
        type: String
    },
    email:{
         type: mongoose.SchemaTypes.Email,
         required: true
    },
    academiclevel :{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    year :{
        type:Date,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    department: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    }
},
 {
    timestamps: true
});



const Approver = mongoose.model('Approver', approverSchema)
module.exports = Approver
