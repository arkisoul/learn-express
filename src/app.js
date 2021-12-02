const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({}).none());
// app.use(parseRequestDataMiddleware)
// app.set("views")
// app.set('view engine', 'pug');
// app.use(express.static(__dirname))

function parseRequestDataMiddleware(req, res, next) {
  const data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    req.body = data.concat().toString();
    next();
  });
}

app.use(
  "/users",
  (req, res, next) => {
    console.log("first middleware. we are here", req.body, req.rawBody, req.files);
    if (req.query.proceed === "true") {
      return next();
    } else {
      return res.send("A response from middleware");
    }
  },
  (req, res, next) => {
    console.log("third middleware. we are here", req.body);
    if (req.query.proceed === "true") {
      return next();
    } else {
      return res.send("A response from middleware");
    }
  },
  routes.users
);

app.use("/auth", routes.auth);
app.get(
  "/",
  (req, res, next) => {
    console.log("first middleware. we are here", req.body);
    if (req.query.proceed === "true") {
      return next();
    } else {
      return res.send("A response from middleware");
    }
  },
  // parseRequestDataMiddleware,
  (req, res, next) => {
    console.log("second middleware. we are here", req.body);
    if (req.query.proceed === "true") {
      return next();
    } else {
      return res.send("A response from middleware");
    }
  },
  (req, res, next) => {
    console.log("route handler.");
    res.send("Welcome to Express server");
  }
);

app.listen(port, () =>
  console.log(`Express server started listening at PORT ${port}`)
);
