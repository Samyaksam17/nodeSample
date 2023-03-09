var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//product schema
var ProductSchema = mongoose.Schema({
    name: {
        type: String
    },
   
    description: {
        type: String
    },
    material: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number
    },
    delivery_charge:{
        type:Number
    },
    product_size:{
        type:String
    },
    available:{
        type:Boolean
    }
});
var Product=mongoose.model('product',ProductSchema);
//add merchant
module.exports.addProduct=(query,callback)=>{
    Product.create(query,callback);
}
//get product by id
module.exports.getproduct=(query,callback)=>{
    Product.findById(query,callback);
}
//remove product
module.exports.deletePro=(query,callback)=>{
    Product.remove(query,callback)
}
//updateproduct
module.exports.updatepro=(query,data,callback)=>{
    Product.findByIdAndUpdate(query,data,callback);
}
//getting single note
module.exports.byid=(query,callback)=>{
    Product.findById(query,callback);
}
//finding all the products
module.exports.getallpro=(query,callback)=>{
    Product.find(query,callback);
}