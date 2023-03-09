const express=require('express');
var router=express.Router();
var City=require('../controller/city');
router.post('/add',City.addCity);
router.post('/update',City.updateCity);
router.post('/getcity',City.getcity);
router.post('/getCityById',City.getCityById);
router.post('/deletcity',City.delete);
router.post('/updatecitystatus',City.updateCityStatus)

module.exports=router;
