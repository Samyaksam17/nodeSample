//import the model
const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const Mail = require("../config/mail");

// for aggregation
const config = require("../config/db");
var mongoose = require("mongoose");
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

//add admin
module.exports.add = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var department = req.body.department;
  var mobile = req.body.mobile;
  var city_id = req.body.city_id;
  //validation
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("password", "password is required").notEmpty();
  req.checkBody("department", "department is required").notEmpty();
  req.checkBody("mobile", "mobile number is required").notEmpty();

  var errors = req.validationErrors(); //as it is already defined in the validation model so directly we can use it.
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    let newAdmin = {
      name: name,
      email: email,
      password: password,
      department: department,
      mobile: mobile,
      status: false,
      created_at: Date(),
      city_id: city_id,
    };
    Admin.createAdmin(newAdmin, (err, admin) => {
      if (err) {
        return res.json({ status: false, error: err });
      } else {
        console.log(admin);
        Mail.mailOptions = {
          from: "shweta.foxaisr@gmail.com",
          to: admin.email,
          subject: "Sending Email to test nodemailer",
          text: "Yeah we did it!!",
        };

        Mail.transporter.sendMail(Mail.mailOptions, function (error, email) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + email);
          }
        });
        return res.json({
          status: true,
          response: admin,
          message: "Admin Created Successfully",
        });
      }
    });
  }
};

//login
module.exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  Admin.getSingleAdmin({ email: email }, (err, admin) => {
    if (admin) {
      console.log(admin);
      Admin.comparePassword(password, admin.password, function (err, isMatch) {
        if (isMatch) {
          const data = {
            _id: admin._id,

            name: admin.name,
            email: admin.email,
            userType: "admin",
          };
          //from the data we generate the token and sign method is used to generate the token
          jwt.sign(data, "secret", (err, token) => {
            return res.json({
              status: true,
              token: "JWT " + token,
              response: data,
            });
          });
        } else {
          return res.json({ status: false, message: "Invalid password" });
        }
      });
    } else {
      return res.json({ status: false, message: "Admin not found" });
    }
  });
};

//getadmin by id
module.exports.getadminbyid = (req, res) => {
  var admin_id = req.body.admin_id;
  //validation
  req.checkBody("admin_id", "Admin id is required").notEmpty();
  var errors = req.validationErrors(); //as it is already defined in the validation model so directly we can use it.
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    Admin.getSingleAdmin({ _id: admin_id }, (err, admin) => {
      if (admin) {
        return res.json({ status: true, response: admin });
      } else {
        return res.json({ status: false, err: err });
      }
    });
  }
};

//remove admin
module.exports.removeadmin = (req, res) => {
  var admin_id = req.body.admin_id;
  //validation
  req.checkBody("admin_id", "Admin id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    Admin.deleteadmin({ _id: admin_id }, (err, admin) => {
      if (admin) {
        return res.json({
          status: true,
          response: admin,
          message: "Admin removed successfully",
        });
      } else {
        return res.json({ status: false, err: err });
      }
    });
  }
};

//update admin
module.exports.updateAdmin = (req, res) => {
  var admin_id = req.body.admin_id;
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  //validation
  req.checkBody("admin_id", "Admin id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    Admin.updateadmin(
      { _id: admin_id },
      { name: name, email: email, mobile: mobile },
      (err, admin) => {
        if (admin) {
          return res.json({
            status: true,
            response: admin,
            message: "Admin details updated successfyully",
          });
        } else {
          return res.json({
            status: false,
            message: "Error occurred while updating!",
          });
        }
      }
    );
  }
};

//update admin status
module.exports.updatestatus = (req, res) => {
  var admin_id = req.body.admin_id;
  var status = req.body.status;
  //validation
  req.checkBody("admin_id", "Admin id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    Admin.updateadmin({ _id: admin_id }, { status: status }, (err, admin) => {
      if (admin) {
        return res.json({
          status: true,
          response: admin,
          message: "Admin status updated successfyully",
        });
      } else {
        return res.json({
          status: false,
          message: "Error occurred while updating status!",
        });
      }
    });
  }
};

//get all the admin
module.exports.getalladmin = (req, res) => {
  var errors = req.validationErrors();

  if (errors) {
    res.json({ status: false, message: "fields are required", error: errors });
  } else {
    db.collection("admins").aggregate([
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "sample",
        },
      },
    ]);
  }

  // let { query = {} } = req.body;

  // Admin.getalladmin(query, (err, admin) => {
  //     if (err) {
  //         return res.json({ status: false, message: "error occurred" });
  //     }
  //     else {
  //         return res.json({ status: true, response: admin });
  //     }
  // })
};

// var errors = req.validationErrors();

// 	if (errors) {
// 		res.json({ status: false, message: "fields are required", error: errors });
// 	} else {
// 		db.collection('services').aggregate([

// 			{
// 				$lookup:
// 				{
// 					from: "service_categories",
// 					localField: "service_category_id",
// 					foreignField: "_id",
// 					as: "service_category"
// 				}
// 			},
// 			{
// 				$lookup:
// 				{
// 					from: "service_subcategories",
// 					localField: "service_subcategory_id",
// 					foreignField: "_id",
// 					as: "service_subcategory"
// 				}
// 			},
// 			{
// 				$lookup:
// 				{
// 					from: "service_primecategories",
// 					localField: "service_primecategory_id",
// 					foreignField: "_id",
// 					as: "service_primecategory"
// 				}
// 			}

// 		]).toArray(function (err, data) {
// 			if (err) return res.json({ status: false, error: err });
// 			return res.json({ status: true, response: data });
// 		});
// 	}

//search admin
module.exports.searchadmins = function (req, res) {
  let { query = "" } = req.query;
  Admin.search_admin(
    { name: new RegExp(`^${query}`, "i") },
    function (err, search) {
      if (err) return res.json({ status: false, message: "Data not found" });
      else return res.json({ status: true, response: search });
    }
  );
};

//profile
module.exports.profile = function (req, res) {
  let admin_id = req.body.admin_id;
  //validation
  req.checkBody("admin_id", "Admin id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json({ status: false, message: "validation error" });
  } else {
    Admin.getSingleAdmin({ _id: admin_id }, (err, admin) => {
      if (err) {
        return res.json({ status: false, message: "Admin profile not found" });
      } else {
        return res.json({ status: true, response: admin });
      }
    });
  }
};

//change password
module.exports.changepassword = (req, res) => {
  var email = req.body.email;
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;
  var confirm_password = req.body.confirm_password;

  //validation
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("old_password", "Old password is required").notEmpty();
  req.checkBody("new_password", "New Password is required").notEmpty();
  req.checkBody("confirm_password", "Confirm Password is required").notEmpty();
  req
    .checkBody("confirm_password", "Confirm_password do not match")
    .equals(req.body.new_password);

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    Admin.getadminbymail({ email: email }, (err, admin) => {
      if (err) {
        return res.json({ status: false, error: err });
      }
      if (admin) {
        Admin.comparePassword(
          old_password,
          admin.password,
          function (err, isMatch) {
            if (err) return res.json({ status: false, error: err });
            if (isMatch) {
              Admin.updatePassword(
                { email: email },
                confirm_password,
                (err, admin) => {
                  if (admin)
                    return res.json({
                      status: true,
                      response: admin,
                      message: "password updated successfully",
                    });
                  else
                    return res.json({
                      status: false,
                      error: err,
                      message: "Error occurred while updating pass",
                    });
                }
              );
            } else
              return res.json({
                status: false,
                message: "old password doesn't match",
              });
          }
        );
      } else {
        return res.json({
          status: false,
          message: "Admin not found through the email",
        });
      }
    });
  }
};
