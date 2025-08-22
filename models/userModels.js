const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type: string,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Your Email must be Unique"],
        minLength: [5, "Email must have 5 characters"],
        lowerCase: true,
    },
    password:{
        type: string,
        required: [true, "Password is must"],
        trim: true,
        select: false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationCodeValidation:{
        type: Number,
        default: false,
    },
    forgotPasswordCode: {
        type: string,
        default: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        default: false,
    },

},{
timestamps:true
});

module.exports = mongoose.model("User", userSchema);