var mockForms = require("./form.mock.json");

module.exports = function () {

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            "_id": (new Date).getTime().toString(),
            "title": form.title,
            "userId": userId
        };
        mockForms.push(newForm);
        return findAllFormsForUser(userId);

        //var newForm = {
        //    "_id": (new Date).getTime(),
        //    "title": form.title,
        //    "userId": userId
        //};
        //mockForms.push(newForm);
        //callback(newForm);
    }

    function findAllFormsForUser(userId) {

        var userForms = [];
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i].userId == userId) {
                var formDetails = {
                    "_id": mockForms[i]._id,
                    "title": mockForms[i].title,
                    "userId": userId,
                    "fields": mockForms[i].fields
                };
                userForms.push(formDetails);
            }
        }
        return userForms;

        //var userForms = [];
        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i].userId == userId) {
        //        var formdetails = {
        //            "_id": mockForms[i]._id,
        //            "title": mockForms[i].title,
        //            "userId": userId
        //        };
        //        userForms.push(formdetails);
        //    }
        //}
        //callback(userForms);
    }

    function deleteFormById(formId) {

        var mainindex, userid;

        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                mainindex = i;
                userid = mockForms[i].userId;
                break;
            }
        }

        mockForms.splice(mainindex, 1);

        var newForms = findAllFormsForUser(userid);
        return newForms;


        //var mainindex, userid;
        //
        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        mainindex = i;
        //        userid = mockForms[i].userId;
        //        break;
        //    }
        //}
        //
        //mockForms.splice(mainindex, 1);
        //
        //var newForms;
        //findAllFormsForUser(
        //    userid,
        //    function ($response) {
        //        newForms = $response;
        //    });
        //callback(newForms);


    }

    function updateFormById(formId, newForm) {

        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                mockForms[i].title = newForm.title;
                return mockForms[i];

            }
        }
        return null;

        //
        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        mockForms[i].title = newForm.title;
        //        callback(mockForms[i]);
        //        break;
        //    }
        //}
    }

};
