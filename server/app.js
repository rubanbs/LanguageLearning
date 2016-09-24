var express = require("express");
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'LanguageLearning',
    debug: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/.."));

var routes = require("./routes/routes.js")(app, pool);

var server = app.listen(80, function () {
    console.log("Listening on port %s...", server.address().port);
});