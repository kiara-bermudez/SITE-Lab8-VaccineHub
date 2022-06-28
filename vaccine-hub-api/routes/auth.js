const express = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        // Take user email and password and authenticate them
    }catch(err) {
        next(err);
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // Take user and email and create new user in database
    }catch(err) {
        next(err);
    }
})

module.exports = router;