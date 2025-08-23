const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema } = require("../middlewares/validator");
const User = require("../models/userModels");
const { doHashValidation, hmacProcess } = require("../utils/hashing");

exports.signup = async (req, res) => {
    const {email, password} = req.body;
    try {
        const {error, value} = signupSchema.validate({email,password});

        if(error) {
            return res.status(401).json({success:false, message: error.details[0].message});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success:false, message: "User already exists!!"})
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = newUser({
            email,
            password: hashedPassword,
        })
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success:true, message:"Your account has been created Successfully",
            result,
        });

    } catch (error) {
        console.log(error)
    }
}

exports.signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const {error, value} = signinSchema.validate({email, password});\
        if(error){
            return res
            .status(401)
            .json({success: false, message: error.details[0].message});
        }

        const existingUser = await User.findOne({email}).select('+password')
        if(!existingUser){
            return res
            .status(401)
            .json({success: false, message: 'User doesnot exists!'})
        }
        const result = await doHashValidation(password, existingUser.password)
        if(!result) {
            return res
            .status(401)
            .json({success: false, message: 'Invalid Credentials'});
        }
           const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified,
           },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '8h',
        }
    );

    res.cookie('Authorization', 'Bearer' + token, { explain: new Date(Date.now() + 8
    * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'
    })
    .json({
        success: true, 
        token,
        message: 'Logged in successfully',
    });

    } catch (error) {
        console.log(error);
        
    }
};

exports.signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).json({success: true, message: 'Logged Out Successfullly'});

};
exports.sendVerificationCode = async (req, res) => {
    const {email} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            return res
            .status(404)
            .json({success: false, message: 'User doesnot Exists!'});
        }
        if(existingUser.verified) {
            return res
            .status(400)
            .json({ success: false, message: 'You are already verified!'});
        }

        const codeValue = Math.floor(Math.random() * 100000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "Verification code",
            html: '<h1>' + codeValue + ' </h1> '
        })

        if(infoaccepted[0] === existingUser.email){
            const hashedCodedValue = hmacProcess(codeValue, process.env,
                HMAC_VERIFICATION_CODE_SECRET)
                existingUser.verification = hashedCodedValue;
                existingUser.verificationCodeValidation = Date.now();
                await existingUser.save();
                return res.status(200).json({success: true, message: 'Code Sent'});
             }
             res.status(400).json({success: false, message: 'code Sent Failed'});

        
    } catch (error) {
        console.log(error);
    }
}