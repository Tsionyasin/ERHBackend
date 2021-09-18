const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema

const userSchema = new Schema ({
   
    name:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true

    },
    passwordConfirm: {
        type: String,
        require: true
    },

    role: {
        type: String,
        default: "user",
        enum: ["admin", "approver", "user", "super-admin"]
    },
    department: {
        type: mongoose.Schema.Types.ObjectId, ref: "Department"
        
    },
    
    institute:{
        type: mongoose.Schema.Types.ObjectId, ref: "Admin"
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },

    approver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Approver"
    },
    profileCreated: {
        type:Boolean,
        default:false
    },

}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User
