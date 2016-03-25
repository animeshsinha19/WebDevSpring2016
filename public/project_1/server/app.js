module.exports = function(app) {


    var http = require("http");

    // Model dependencies
    var userModel    = require("./models/user.model.server.js")();
    var restaurantModel = require("./models/restaurant.model.server.js")();

    // Service dependencies
    var userService  = require("./services/user.service.server.js") (app, userModel);
    var restaurantService  = require("./services/restaurant.service.server.js") (app, restaurantModel);

}