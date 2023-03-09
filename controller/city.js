const City = require('../model/city');

module.exports.addCity = (req, res) => {
    var name = req.body.name;
    var amount = req.body.amount;
    var type = req.body.type;
    //validation
    req.checkBody('name', 'Name is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.json({ status: false, error: errors });
    } else {
        let cityObj = {
            name: name,
            amount: amount,
            type: type,
            status: true,
            created_at: Date()
        };

        City.createCity(cityObj, (err, result) => {
            if (err) return res.json({ status: false, error: err });
            else return res.json({ status: true, response: result });
        });
    }
}
//update city
module.exports.updateCity = (req, res) => {
    var city_id = req.body.city_id;
    var name = req.body.name;
    var amount = req.body.amount;
    var type = req.body.type;
    City.updateCity({ _id: city_id }, { name: name, amount: amount, type: type }, function (err, city) {
        if (city) {
            return res.json({ status: true, response: city });
        }
        else {
            return res.json({ status: false, message: "can't able to update" });
        }
    })
}
//getallcity
module.exports.getcity=(req,res)=>{
    let query=req.body.query;
    City.getAllCity(query,(err,city)=>{
        if(err) return res.json({status:false,response:err});
        if (city){
            return res.json({status:true,response:city});
        }else{
            returnres.json({status:false,message:"Error occured!"});
        }
    })
}

module.exports.sampleCity=function(req,res){
	let {query = ''} = req.query;
	City.sample({ name: new RegExp(`^${query}`, "i") },function(err,search){

      if(err) return res.json({status:false,message:"Data not found"});
	  else return res.json({status:true,response:search});
	})

}

//getcitybyid
module.exports.getCityById=(req,res)=>{
    let city_id=req.body.city_id;
    City.citybyid({_id:city_id},(err,city)=>{
        if(err) return res.json({status:false,message:"id is wrong"});
        else return res.json({status:true,response:city});
    })
}

//removecity
module.exports.delete=(req,res)=>{
    let city_id=req.body.city_id;
    //validation
    req.checkBody('city_id',"city_id is required").notEmpty();
    var errors=req.validationErrors();
    if(errors) return res.json({status:false,message:"validation error"});
    else{
        City.deleteCity({_id:city_id},(err,city)=>{
            if(city) return res.json({status:true,message:"removed successfully"});
            else return res.json({status:false,message:"error occured while removing"});
        })
    }
}

//update city
module.exports.updateCityStatus=(req,res)=>{
    let city_id=req.body.city_id;
    let status=req.body.status;
    //validation
    req.checkBody('city_id',"city_id is required").notEmpty();
    let errors=req.validationErrors();
    if(errors) return res.json({status:false,message:"validation error"});
    else{
        var update={
            status:status,
            updated_at:Date()
        }
        City.updateCity({_id:city_id},update,(err,city)=>{
            if(err) return res.json({status:false,error:err})
            if(city) return res.json({status:true,message:"Status updated successfully"});
            else return res.json({status:false,message:"can't able to update status"});
        })
    }

}