module.exports = function (mongoose) {

    var commentSchema = require("./comment.schema.server.js")(mongoose);
    var restaurantSchema = require("./restaurant.schema.server.js")(mongoose);

    var userSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String],
            likes: [restaurantSchema],
            comments: [commentSchema],
            follows: [String]
        },
        {
            collection: 'prjusers'
        }
    );

    return userSchema;

};