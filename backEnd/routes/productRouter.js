const { Router } = require("express");
const express = require("express");
const router = express.Router()
const { protect } = require("../middleWare/authMiddleware")
const fileUpload = require('express-fileupload')
const productController = require('../controllers/productController');

router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
router.route("/").get(protect,productController.productlist).post(protect, productController.uploadProducts)



module.exports = router