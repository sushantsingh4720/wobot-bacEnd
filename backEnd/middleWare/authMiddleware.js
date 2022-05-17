const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../Models/userModel');
const Admin=require("../Models/adminModel")

//for authorisation of user token
const protect =asyncHandler(async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token
            token=req.headers.authorization.split(' ')[1];
            
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
           
            //get user from token
            req.user=await User.findById(decoded.id).select('-password')
            
            next()

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error("Not authorised")

        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorised not token");
    }

})

//for authorisation of admin token
const protectAdmin =asyncHandler(async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token
            token=req.headers.authorization.split(' ')[1];
            
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
           
            //get user from token
            req.admin=await Admin.findById(decoded.id).select('-password')
            
            next()

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error("Not authorised")

        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorised not token");
    }

})

module.exports={protect,protectAdmin}