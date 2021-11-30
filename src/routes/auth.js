const express = require('express');

const router = express.Router();

router.post("/login", (req, res, next) => {
    return res.json({
        status: 'success',
        error: null,
        data: 'Login successful'
    })
})

router.post("/register", (req, res, next) => {
    return res.json({
        status: 'success',
        error: null,
        data: 'Login successful'
    })
})

module.exports = router