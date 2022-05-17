const { Router } = require("express");
const express=require("express");
const router=express.Router();
const {protectAdmin}=require("../middleWare/authMiddleware")
const {Signup,Login,Userlist,Userdetails}=require("../controllers/userController")


router.route("/").post(Signup)
router.route("/login").post(Login)
router.route("/userlist").get(protectAdmin,Userlist)
router.route('/userdetails/:id').get(protectAdmin,Userdetails)


module.exports=router