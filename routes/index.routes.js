module.exports = (app) => {
  let userRoute = require("./user/user.routes");
  let postRoute = require("./post/post.routes");

  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/post", postRoute);
};
