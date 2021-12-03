const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
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
  return res.render("index", { title: 'Express | Home Page', heading: 'Welcome to Expressjs' });
});
app.get("/about", (req, res, next) => {
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
  const user = req.body;
  return res.render("contact", { title: "Express | Contact Page", user: user });
});
app.get("/portfolio", (req, res, next) => {
  return res.render("portfolio", { title: "Express | Portfolio Page" });
});

app.listen(port, () =>
  console.log(`Express server started listening at PORT ${port}`)
);
