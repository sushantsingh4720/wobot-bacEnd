const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Admin = require("../Models/adminModel");
const List = require("../Models/productModel")
const Product=require("../Models/productModel")
const { find, rawListeners, findOne, create, findById } = require("../Models/userModel");

//@desc Signup users
//@route post  /api/users
//@access anyone can signup

const Signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, password } = req.body

    //check all required filled fill or not
    if (!firstName || !lastName || !username || !password) {
        res.status(400)
        throw new Error("Please fill all the field")
    }
    //check user already exist or not
    const existuser = await User.findOne({ username })
    if (existuser) {
        res.status(400)
        throw new Error("already existing user")
    }

    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    //create users
    const user = await User.create({
        firstName,
        lastName,
        username,
        password: hashPassword
    })
    if (user) {
        res.status(200)
        res.json({
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            token: generateToken(user.id)

        })
    }
    else {
        res.status(400)
        throw new Error("invalid user data")
    }

})

//@desc Login users
//@route post  /api/users/login
//@access anyone can login

const Login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    //check all require filled fill or not
    if (!username || !password) {
        res.status(400)
        throw new Error("Please fill the username and password")
    }

    //check user exist and password compare
    const user = await User.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200)
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(404)
        throw new Error("Invalid credintials")
    }

})


//@desc Fetch User List*
//@route get  /api/users/userlist
//@access only admin can access userlist
const Userlist = asyncHandler(async (req, res) => {

    //check authorisation
    const admin = await Admin.findById(req.admin._id)
    if (admin) {
        const userList = await User.find({}).select('firstName lastName -_id')
        if (userList) {
            res.status(200)
            res.json({ userList: userList })
        }
        else {
            res.status(400)
            res.json("No userList")
        }

    }
    else {
        res.status(400)
        throw new Error("Not authorised")
    }

})


//@desc Fetch User List*
//@route get  /api/users/userdetails/:id
//@access only admin can access userdetails
const Userdetails = asyncHandler(async (req, res) => {
    
    //check authorisation
    const admin = await Admin.findById(req.admin._id)
    const user = await User.findById(req.params.id).select("-password")
    if (admin && user) {
        const list = await Product.find({ _createdBy: user._id })
       
            res.status(200)
            res.json({userList:user,userProductlist:list})

        
    }
    else {
        res.status(400)
        throw new Error("Not authorised or not exist user")
    }


})

//generatetoken
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    Signup, Login, Userlist, Userdetails
}