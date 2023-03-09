var express=require('express');
var router=express.Router();
var Product=require('../controller/product');
router.post('/addProduct',Product.addproduct);
router.post('/getproductbyid',Product.getProductById);
router.post('/deleteproduct',Product.deleteProduct);
router.post('/update',Product.updateProduct);
// router.post('byid/:id',Product.byid);
router.post('/getallproduct',Product.getAllProduct);

module.exports=router