const { Router } = require("express");
const express=require("express");
const router=express.Router();
const {adminSignup,adminLogin}=require("../controllers/adminController")



router.route("/").post(adminSignup)
router.route("/login").post(adminLogin)



module.exports=router