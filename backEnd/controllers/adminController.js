const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel");
const { find, rawListeners, findOne, create } = require("../Models/userModel");

//@desc Signup admin
//@route post  /api/admin
//@access if you have [access key] then you sign up

const adminSignup = asyncHandler(async (req, res) => {
    const {firstName,lastName,username,password,accessKey}=req.body;

//check all field fill or not
    if (!firstName || !lastName || !username || !password||!accessKey) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    //check admin already exist or not
    const existAdmin = await Admin.findOne({ username })
    if (existAdmin) {
        res.status(400)
        throw new Error("already existing user")
    }

    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

//compares admin ACCESS_KEY same or not it is required for a admin
    if(process.env.ACCESS_KEY===accessKey){
        const admin = await Admin.create({
            firstName,
            lastName,
            username,
            password: hashPassword,
            accessKey
        })
        res.status(200)
        res.json({
            firstName: admin.firstName,
            lastName: admin.lastName,
            username: admin.username,
            token: generateToken(admin._id)

        })
    }
    else{
        res.status(400)
        throw new Error("Please provide all the field or please enter the correct access key")
    }
})


//@desc login admin
//@route post  /api/admin/login
//@access if you have access key then you login

const adminLogin = asyncHandler(async (req, res) => {
    const { username, password,accessKey } = req.body
    
    //check all required field fill or not
    if (!username || !password||!accessKey) {
        res.status(400)
        throw new Error("Please fill the username and password")
    }

    //check admin exist or not if admin exist then password and admin ACCESS_KEY match or not 
    const admin = await Admin.findOne({ username })
    if (admin && (await bcrypt.compare(password, admin.password))&&process.env.ACCESS_KEY===accessKey) {
        res.status(200)
        res.json({
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            username: admin.username,
            token: generateToken(admin._id)
        })
    }
    else {
        res.status(404)
        throw new Error("Invalid credintials")
    }
 
 })

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}








module.exports={adminSignup,adminLogin}