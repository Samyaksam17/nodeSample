var express = require("express");
var router = express.Router();
const passport = require("passport");

//import the controller
var Admin = require("../controller/admin");
router.post("/addadmin", Admin.add);
router.post("/login", Admin.login);
router.post("/getadminbyid", Admin.getadminbyid);
router.post("/remove", Admin.removeadmin);
router.post("/update", Admin.updateAdmin);
router.post("/updatestatus", Admin.updatestatus);
router.post("/getalladmin", Admin.getalladmin);
router.get("/search", Admin.searchadmins);
router.post("/profile",passport.authenticate("jwt", { session: false }),Admin.profile);
router.post("/changepassword", Admin.changepassword);

module.exports = router;
