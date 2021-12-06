const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'somerandomsecurekey',
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false,
  }
}))
// app.use(parseRequestDataMiddleware) // custom middleware
// set view engine
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "pug"); // pug | jade | ejs | handlebarjs | haml | mustache

// setup static files
app.use(express.static(path.join(__dirname, "public")));

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
  // (req, res, next) => {
  //   console.log("first middleware. we are here", req.body, req.rawBody, req.files);
  //   if (req.query.proceed === "true") {
  //     return next();
  //   } else {
  //     return res.send("A response from middleware");
  //   }
  // },
  // (req, res, next) => {
  //   console.log("third middleware. we are here", req.body);
  //   if (req.query.proceed === "true") {
  //     return next();
  //   } else {
  //     return res.send("A response from middleware");
  //   }
  // },
  routes.users
);

app.use("/auth", routes.auth);
app.get("/", (req, res, next) => {
  console.log(req.session, req.sessionID);
  req.session.somekey = 'somevalue';
  return res.render("index", { title: 'Express | Home Page', heading: 'Welcome to Expressjs' });
});
app.get("/about", (req, res, next) => {
  console.log(req.session.somekey);
  return res.render("about", {
    title: "Express | About Page",
    content: [
      {
        text: "Team",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet facilis repellat optio eaque quasi corrupti fugit reprehenderit praesentium natus unde soluta labore, cum aperiam aspernatur, excepturi nobis quae nihil sed?",
      },
      {
        text: "Vision",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet facilis repellat optio eaque quasi corrupti fugit reprehenderit praesentium natus unde soluta labore, cum aperiam aspernatur, excepturi nobis quae nihil sed?",
      },
      {
        text: "Mission",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet facilis repellat optio eaque quasi corrupti fugit reprehenderit praesentium natus unde soluta labore, cum aperiam aspernatur, excepturi nobis quae nihil sed?",
      },
    ],
  });
});
app.get("/contact", (req, res, next) => {
  return res.render("contact", { title: "Express | Contact Page" });
});
app.post("/contact", (req, res, next) => {
  try {
    const user = req.body;
    req.body.data.name;
    return res.render("contact", { title: "Express | Contact Page", user: user });
  } catch (error) {
    error.status = 400;
    throw error;
  }
});
app.get("/portfolio", (req, res, next) => {
  /**
   * Simulating an error in route handler
   * that will be handled by the global error handler middleware
   */
  // const error = new Error('Unable to process your request at this moment. Please try again later');
  // error.status = 400;
  // throw error;
  return res.render("portfolio", { title: "Express | Portfolio Page" });
});

app.use(function(req, res, next) {
  // res.locals.message = `The page you are looking for is not found`
  // res.locals.error = new Error(`The page you are looking for is not found`);
  // return res.render('error')
  const error = new Error(`The page you are looking for is not found`);
  error.status = 404;
  return next(error);
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err

  res.statusCode = (err.status || 500);
  return res.render("error");
})

app.listen(port, () =>
  console.log(`Express server started listening at PORT ${port}`)
);
