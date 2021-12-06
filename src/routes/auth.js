const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res, next) => {
  // in real case we would be receiving user information in the  request
  // that would be verified with the database values
  const token = jwt.sign({
      userId: 1,
      role: 'admin',
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 1 * 60 * 60),
  }, 'somesecuredjwtkey');

  return res.json({
    status: "success",
    error: null,
    message: "Login successful",
    data: token
  });
});

router.post("/register", (req, res, next) => {
  return res.json({
    status: "success",
    error: null,
    data: "Login successful",
  });
});

module.exports = router;
