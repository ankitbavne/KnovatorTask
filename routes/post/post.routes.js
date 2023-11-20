var express = require("express");
var router = express.Router();
const passport = require("passport");
const controller = require("../../controller/post");
const validator = require("../../helper/joivalidation");
var app = express();
app.use(passport.initialize());
require("../../helper/passport");

router.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  validator.addPostValidator,
  controller.createPost
);

router.get(
  "/getPost",
  passport.authenticate("jwt", { session: false }),
  validator.getPostValidator,
  controller.getPost
);

router.put(
  "/updatePost",
  passport.authenticate("jwt", { session: false }),
  validator.updatePostValidator,
  controller.updatePost
);

router.delete(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  validator.deletePostValidator,
  controller.deletePost
);

router.get(
  "/countActiveAndInactive",
  passport.authenticate("jwt", { session: false }),
  controller.countActiveAndInactive
);

router.get(
  "/getPostByGeoLocation",
  passport.authenticate("jwt", { session: false }),
  controller.getPostByGeoLocation
);

module.exports = router;
