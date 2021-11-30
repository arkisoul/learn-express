const express = require("express");

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {},
  (req, res, next) => {
    console.log("First get route handler");
    return res.json({
        status: "success",
        error: null,
        data: 'User list'
    });
  }
);

router.get("/test-user", (req, res, next) => {
  console.log("Second get route handler");
  return res.json({
    status: "success",
    error: null,
    data: "User list",
  });
});

router.post("/", (req, res, next) => {
    console.log(req.body, req.params, req.query);
    return res.json({
      status: "success",
      error: null,
      data: `User created`,
    });
})

router.put("/:userId/update/:name", (req, res, next) => {
    const data = [];
    req.on("data", (chunk) => {
        data.push(chunk);
    })

    req.on("end", () => {
        req.body = data.concat().toString();
        console.log(req.body, req.params, req.query);
        return res.json({
          status: "success",
          error: null,
          data: `User created`,
        });
    })
})

module.exports = router;