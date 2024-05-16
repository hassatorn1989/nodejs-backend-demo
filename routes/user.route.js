const user = require("../controllers/user.controller.js");
var router = require("express").Router();

// Create a new Tutorial
router.get("/", user.index);
router.post("/store", user.store);
router.get("/edit/:id", user.edit);
router.put("/update/:id", user.update);
router.delete("/delete/:id", user.delete);

module.exports = router;    