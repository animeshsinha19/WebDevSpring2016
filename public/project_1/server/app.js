module.exports = function(app) {

    // Model dependencies
    var userModel    = require("./models/user.model.server.js")();

    // Service dependencies
    var userService  = require("./services/user.service.server.js") (app, userModel);

}