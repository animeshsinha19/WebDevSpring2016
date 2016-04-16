module.exports = function (app, db, mongoose) {

    // Model dependencies
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var restaurantModel = require("./models/restaurant.model.server.js")(db, mongoose);

    // Service dependencies
    var userService = require("./services/user.service.server.js")(app, userModel);
    var restaurantService = require("./services/restaurant.service.server.js")(app, restaurantModel);

}