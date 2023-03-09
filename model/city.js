var mongoose=require('mongoose');
//city schema
var CitySchema=mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:Number
    },
    amount:{
        type:Number
    },
    status:{
        type:Boolean
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    }
});
var City=mongoose.model('city',CitySchema);
//Add city
module.exports.createCity=function(newCity,callback){
    City.create(newCity,callback);
}
//update
module.exports.updateCity=function(query,data,callback){
    City.findOneAndUpdate(query,data,callback);
}
//getallcity
module.exports.getAllCity=function(query,callback){
    City.find(query,callback,{sort:{amount:1}});
}
//findCity
module.exports.sample=function(query,callback){
    City.find(query,callback);
}

//getcitybyid
module.exports.citybyid=function(query,callback){
    City.findById(query,callback);
}

//removecity
module.exports.deleteCity=function(query,callback){
    City.remove(query,callback);
}

