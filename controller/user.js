// import user model
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  //validation
  req.checkBody("name", "name is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    let userObj = {
      name: name,
      email: email,
      password: password,
    };

    User.createUser(userObj, (err, result) => {
      if (err) return res.json({ status: false, error: err });
      else return res.json({ status: true, response: result });
    });
  }
};

const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.getSingleUser({ email: email }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      // console.log(user);
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) return res.json(helper.error_response(err));
        if (isMatch) {
          const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: "user",
          };

          jwt.sign(data, "secret", (err, token) => {
            return res.json({
              status: true,
              token: "JWT " + token,
              response: data,
            });
          });
        } else {
          return res.json({ status: false, message: "Invalid Password" });
        }
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

const profile = (req, res) => {
  let user_id = req.body.user_id;

  User.getSingleUser({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        status: true,
        response: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

const remove = (req, res) => {
  let user_id = req.body.user_id;

  User.removeUser({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        status: true,
        response: user,
        message: "removed success",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

const update = (req, res) => {
  let user_id = req.body.user_id;
  let name = req.body.name;
  let email = req.body.email;

  User.updateUser(
    { _id: user_id },
    { name: name, email: email },
    function (err, user) {
      if (err) return res.json({ status: false, error: err });
      if (user) {
        return res.json({
          status: true,
          message: "update success",
        });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  );
};

const getAllUser = (req, res) => {
  let query = req.body.query;
  User.getUsers(query, (err, result) => {
    res.json({ status: true, response: result, totaluser: result.length });
  });
};

module.exports = {
  register,
  login,
  profile,
  remove,
  update,
  getAllUser,
};
