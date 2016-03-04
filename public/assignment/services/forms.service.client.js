(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var allForms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];


        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            allForms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {

            var userForms = [];
            for (var i = 0; i < allForms.length; i++) {
                if (allForms[i].userId == userId) {
                    var formdetails = {
                        "_id": allForms[i]._id,
                        "title": allForms[i].title,
                        "userId": userId
                    };
                    userForms.push(formdetails);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {

            var mainindex, userid;

            for (var i = 0; i < allForms.length; i++) {
                if (allForms[i]._id == formId) {
                    mainindex = i;
                    userid = allForms[i].userId;
                    break;
                }
            }

            allForms.splice(mainindex, 1);

            var newForms;
            findAllFormsForUser(
                userid,
                function ($response) {
                    newForms = $response;
                });
            callback(newForms);


        }

        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < allForms.length; i++) {
                if (allForms[i]._id == formId) {
                    allForms[i].title = newForm.title;
                    callback(allForms[i]);
                    break;
                }
            }
        }

    }
})();