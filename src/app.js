const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config");
const session = require("express-session");
const passport = require("./middleware/oAuth");
const app = express();

//connect db
require("./db/conn");

app.use(
  session({
    secret: "mytestkey123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//middlewares
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

//start
app.get("/", (req, res) => {
  res.send("Welcome to this Api....");
});

//routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));

// CELEBRATE ERROR HANDLING
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`🚀 App running on: http://localhost:${PORT}`);
});
