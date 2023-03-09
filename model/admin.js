var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcryptjs");
//creating the admin schema
var AdminSchema = mongoose.Schema({
  city_id: {
    type: mongoose.Schema.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    require: true,
  },
  mobile_number: {
    type: Number,
    require: true,
  },
  department: {
    type: String,
    // unique: true
  },
  status: {
    type: Boolean,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

AdminSchema.plugin(uniqueValidator);
const Admin = mongoose.model("admin", AdminSchema);

//create admin
module.exports.createAdmin = (newAdmin, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newAdmin.password, salt, function (err, hash) {
      console.log(newAdmin.password);
      newAdmin.password = hash;
      console.log(newAdmin.password); //password encrypted now
      Admin.create(newAdmin, callback);
    });
  });
};

//compare password
module.exports.comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, function (err, isMatch) {
    console.log(password);
    console.log(hash);
    // if (err) throw err;
    callback(null, isMatch);
  });
};

//get single admin
module.exports.getSingleAdmin = (query, callback) => {
  Admin.findOne(query, callback, { password: 0 });
};

// remove admin
module.exports.deleteadmin = (query, callback) => {
  Admin.remove(query, callback);
};

//update Admin
module.exports.updateadmin = (query, data, callback) => {
  Admin.findByIdAndUpdate(query, data, callback);
};

//get all admin
module.exports.getalladmin = (query, callback) => {
  Admin.find(query, callback);
};

//search admin
module.exports.search_admin = function (query, callback) {
  Admin.find(query, callback);
};

//getadmin by mail
module.exports.getadminbymail = function (query, callback) {
  Admin.findOne(query, callback);
};

// Update Password
module.exports.updatePassword = function (query, password, callback) {
  // var query = { email: email };
  var update = {
    password: password,
    updated_at: Date(),
  };
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(update.password, salt, function (err, hash) {
      update.password = hash;
      Admin.findOneAndUpdate(query, update, callback);
    });
  });
};
