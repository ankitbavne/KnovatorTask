var express = require("express");
var router = express.Router();
const passport = require("passport");
const controller = require("../../controller/user");
const validator = require("../../helper/joivalidation");
var app = express();

app.use(passport.initialize());
require("../../helper/passport");

router.post("/register", validator.registration, controller.register);

router.post("/login", validator.login, controller.login);

module.exports = router;
