var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
//
var model = require("./model/db.js"); //

var app = express();
app.use(cors());

// serves files in public folder
app.use(express.static("public"));

// NB:: this must be included to get JSON content sent with requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///////////////////////////////////////////////////////////////////////////////////////////

// /venues GET route
app.route("/venues").get(function (req, res) {
  model.getVenues(req, res);
});

// /teams GET route
app.route("/teams").get(function (req, res) {
  model.getTeams(req, res);
});

// /teams/pool GET route
app.route("/teams/:pool?").get(function (req, res) {
  model.getTeamsByPool(req, res);
});

// /players GET route
app.route("/players").get(function (req, res) {
  model.getPlayers(req, res);
});

// /somePlayers GET route
app.route("/somePlayers").get(function (req, res) {
  model.getSomePlayers(req, res);
});

// /results GET route
app.route("/results").get(function (req, res) {
  model.getResults(req, res);
});

// /results/matchID PUT route
app.route("/results/:id?").put(function (req, res) {
  model.updateResultsByMatchID(req, res);
});

// /results/teamID GET route
app.route("/results/:id?").get(function (req, res) {
  model.getResultsByTeamID(req, res);
});

// /pools GET route
app.route("/pools").get(function (req, res) {
  model.getPools(req, res);
});

// /tackles GET route
app.route("/tackles").get(function (req, res) {
  model.getTackles(req, res);
});

// /points GET route
app.route("/points").get(function (req, res) {
  model.getPoints(req, res);
});

// /login POST route
app.route("/login").post(function (req, res) {
  model.login(req, res);
});

var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
