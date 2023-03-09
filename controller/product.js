var Product = require('../model/product');
module.exports.addproduct = (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var material = req.body.material;
    var color = req.body.color;
    var delivery_charge = req.body.delivery_charge;
    var price = req.body.price;
    var product_size = req.body.product_size;
    var available = req.body.available;
    //validation
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('material', 'material is required').notEmpty();
    req.checkBody('color', 'color is required').notEmpty();
    req.checkBody('delivery_charge', 'delivery_charge is required').notEmpty();
    req.checkBody('price', 'price is required').notEmpty();
    req.checkBody('product_size', 'product_size is required').notEmpty();
    req.checkBody('available', 'available field is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) res.json({ status: false, message: "Fields are missing", errors: errors });
    else {
        var newproduct = {
            name: name,
            description: description,
            material: material,
            color: color,
            delivery_charge: delivery_charge,
            price: price,
            product_size: product_size,
            available: available
        }
        Product.addProduct(newproduct, (err, product) => {
            if (err) return res.json({ status: false, message: "Error occurred while adding product!" });
            else return res.json({ status: true, response: product });
        })
    }

}

//getproductbyid
module.exports.getProductById = (req, res) => {
    let product_id = req.body.product_id;
    req.checkBody('product_id', "product id is required");
    var errors = req.validationErrors();
    if (errors) return res.json({ status: false, errors: errors });
    else {
        Product.getproduct({ _id: product_id }, (err, product) => {
            if (err) return res.json({ status: false, message: "id is wrong" });
            else return res.json({ status: true, response: product });
        });
    }

}
//delete
module.exports.deleteProduct = (req, res) => {
    let product_id = req.body.product_id;
    req.checkBody('product_id', "product_id is required");
    var errors = req.validationErrors();
    if (errors) return res.json({ status: false, errors: errors });
    else {
        Product.deletePro({ _id: product_id }, (err, product) => {
            if (err) return res.json({ status: false, message: "id is required" });
            else return res.json({ status: true, message: "removed success " })
        })
    }

}
//update
module.exports.updateProduct = (req, res) => {
    let _id = req.body._id;
    let name = req.body.name;
    let description = req.body.description;
    let material = req.body.material;
    let color = req.body.color;

     //validation
     req.checkBody('name', 'name is required').notEmpty();
     req.checkBody('description', 'description is required').notEmpty();
     req.checkBody('material', 'material is required').notEmpty();
     req.checkBody('color', 'color is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) return res.json({ status: false, errors: errors })
    else {
        var updateProducts = {
            name: name,
            description: description,
            material: material,
            color: color
        }

        Product.updatepro({ _id: _id }, updateProducts, (err, product) => {
            if (err) return res.json({ status: false, message: err });
            else return res.json({ status: true, response: product })
        })
    }


}

//byid
// module.exports.byid=(req,res)=>{
//     Product.byid(req.params.id,(err,product)=>{
//         if(err) res.json({status:false,response:err});
//         else res.json({status:true, response:product});
//     })
// }
//get all the products
module.exports.getAllProduct=(req,res)=>{
    
    Product.getallpro()
}
