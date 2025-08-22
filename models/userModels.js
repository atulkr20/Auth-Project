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
    

})