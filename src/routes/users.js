const express = require("express");

const router = express.Router();
let users = [];

const validateUserDataMiddleware = (req, res, next) => {
  if(!req.body.id) return res.json({
    status: "failure",
    message: `Id is required`,
    data: null,
    error: "Missing id",
  });
  if(!req.body.name) return res.json({
    status: "failure",
    message: `Name is required`,
    data: null,
    error: "Missing name",
  });
  next();
}

// const middleware = (req, res, next) => {console.log('router level middleware'); next()};
router.get("/", (req, res, next) => {
  // console.log("First get route handler");
  return res.json({
    status: "success",
    message: "Users list",
    data: users,
    error: null,
  });
});

router.get("/test-user", (req, res, next) => {
  console.log("Second get route handler");
  return res.json({
    status: "success",
    error: null,
    data: "User list",
  });
});

router.post("/", validateUserDataMiddleware, (req, res, next) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
  };
  users.push(user);
  // console.log(req.body, req.params, req.query);
  return res.json({
    status: "success",
    message: `User created`,
    data: user,
    error: null,
  });
});

router.put("/:userId", validateUserDataMiddleware, (req, res, next) => {
  let user = null;
  let userIndex = null;
  users.forEach((userData, index) => {
    if (userData.id === +req.params.userId) {
      user = userData;
      userIndex = index;
    }
  })
  if(user) {
    user.id = req.body.id;
    user.name = req.body.name;
    user.phone = req.body.phone;
    users.splice(userIndex, 1, user);

    return res.json({
      status: "success",
      message: `User updated`,
      data: user,
      error: null,
    });
  } else {
    return res.json({
      status: "failure",
      message: `No user found`,
      data: null,
      error: 'Invalid id',
    });
  }
  /* const data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    req.body = data.concat().toString();
    console.log(req.body, req.params, req.query);
    return res.json({
      status: "success",
      error: null,
      data: `User created`,
    });
  }); */
});

router.delete("/:userId", (req, res, next) => {
  const updatedUsersList = users.filter(user => user.id !== +req.params.userId)
  users = updatedUsersList;

  return res.json({
    status: "success",
    message: `User deleted`,
    data: users,
    error: null,
  });
})

module.exports = router;
