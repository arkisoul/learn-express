const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "somerandomsecurekey",
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
    },
  })
);
// app.use(parseRequestDataMiddleware) // custom middleware
// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // pug | jade | ejs | handlebarjs | haml | mustache

// setup static files
app.use(express.static(path.join(__dirname, "public")));

const userSchema = new mongoose.Schema({
  title: String,
  name: String,
  phone: Number
})

const UserModel = mongoose.model("User", userSchema);

mongoose
  .connect(
    "mongodb+srv://learning:learning123@learning.zejua.mongodb.net/firstexpress?retryWrites=true&w=majority"
  )
  .then(async (db) => {
    console.log(`Mongodb database connected successfully`);
    const user = await UserModel.create({
      title: 'Mr',
      name: 'John Doe',
      phone: 9876543210
    })
  })
  .catch((err) => console.error(`Error connecting to mongodb database`, err));

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
  req.session.somekey = "somevalue";
  return res.render("index", {
    title: "Express | Home Page",
    heading: "Welcome to Expressjs",
  });
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

const upload = multer();

app.post("/contact", upload.single("displayImage"), (req, res, next) => {
  try {
    const user = req.body;

    const isUploadFolderExist = fs.existsSync(
      path.join(__dirname, "public", "uploads")
      // /User/Username/Projects/firstexpress/src/public/uploads
    );
    if (!isUploadFolderExist) {
      fs.mkdirSync(path.join(__dirname, "public", "uploads"));
    }

    fs.writeFile(
      path.join(__dirname, "public", "uploads", req.file.originalname),
      req.file.buffer,
      { encoding: "utf8" },
      (err) => {
        if (err) throw err;

        const publicUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.originalname}`;

        return res.render("contact", {
          title: "Express | Contact Page",
          user: user,
          file: publicUrl,
        });
      }
    );
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

app.get("/content", (req, res, next) => {
  res.format({
    json: () => res.json({ title: "Express | Portfolio Page" }),
    html: () => res.send("<h1>Express | Portfolio Page</h1>"),
    xml: () => res.send("<Doc><Title>Express | Portfolio Page</Title></Doc>"),
    text: () => res.send("Express | Portfolio Page"),
  });
});

app.use(function (req, res, next) {
  // res.locals.message = `The page you are looking for is not found`
  // res.locals.error = new Error(`The page you are looking for is not found`);
  // return res.render('error')
  const error = new Error(`The page you are looking for is not found`);
  error.status = 404;
  return next(error);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  res.statusCode = err.status || 500;
  return res.render("error");
});

app.listen(port, () =>
  console.log(`Express server started listening at PORT ${port}`)
);
