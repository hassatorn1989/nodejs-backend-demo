const user = require("./user.route.js");
const auth = require("./auth.route.js");

module.exports = app => {
    app.use("/api/auth", auth);
    app.use("/api/user", user);
}