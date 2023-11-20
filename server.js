let express = require("express");
let path = require("path");
let database = require("./helper/database");
let config = require("./config.json");
var bodyParser = require("body-parser");
let cors = require("cors");
const passport = require("passport");
require("./helper/passport");

database.initModels();
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
database.connect();
app.use(passport.initialize());
global.globalString = "This can be accessed anywhere!++++++++++++++";


function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}

enableStaticFileServer(app, config.uploadUrl, "/");
require("./routes/index.routes")(app);

app.listen(config.server.port, () => {
  console.log("App listening on port : ", config.server.port);
});
