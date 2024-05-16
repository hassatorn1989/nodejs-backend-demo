const auth = require("../controllers/auth.controller.js");
var router = require("express").Router();

// Create a new Tutorial
router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;