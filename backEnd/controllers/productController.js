const asyncHandler  = require('express-async-handler');
const Product = require("../Models/productModel");
const User=require("../Models/userModel")
const fs = require("fs");
const { Userdetails } = require('./userController');


//@desc upload products 
//@ post /api/products
//@access authorised by user
exports.uploadProducts = asyncHandler ( async ( req, res, next)=>{
    
    //check authorisation
   const user=await User.findById(req.user._id)
   if(user){
    const file = req.files.file;
    let productList= [];
    fs.readFile( file.tempFilePath, 'utf-8', async (err, data) => {
        if (err) throw err;
        const temp = data.split("\r");
        for(var i=1; i< temp.length; i++){
            var product = {};
            const t = temp[i].split(',');
            product.name = t[0].substring(1);
            product.description = t[1];
            product.quantity = parseInt(t[2]);
            product.price = parseFloat(t[3]);
            product._createdBy= req.user._id;

          //create productlist
            const prod = await Product.create(product); 
            productList.push(product);
            
        }
        res.status(200)
        res.json({productList});
    })
}
else{
    res.status(400)
    throw new Error("not authorised")
}
    
    
})

//@desc fetch productlist
//@ get /api/products
//@access authorised by user
exports.productlist=asyncHandler(async (req,res)=>{
    //check authorisation
    const list=await Product.find({_createdBy:req.user._id})
    if(!list){
        res.status(400)
        throw new Error("unAuthorised")
    }
    res.status(200)
    res.json(list)

})

