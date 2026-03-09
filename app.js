require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { requireAuth } = require("./middlewares/authMiddleware");
var recettesRouter = require("./routes/recettes");
var challengesRouter = require("./routes/challenges");
var eventsRouter = require("./routes/events");

var app = express();
const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//* Ajout du middleware dans le app.use('/') pour intercepter  les connexions
//* et vérifier le token donné en header par le front
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recettes", recettesRouter);
app.use("/challenges", challengesRouter);
app.use("/events", eventsRouter);

module.exports = app;
