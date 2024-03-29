var express = require("express");
var bodyParser = require("body-parser");
var path=require("path");

var app = express();
var PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(PORT, function () {
    console.log(`Listening on PORT number: ${PORT}`);
})

