(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        //var allForms = [
        //    {"_id": "000", "title": "Contacts", "userId": 123},
        //    {"_id": "010", "title": "ToDo", "userId": 123},
        //    {"_id": "020", "title": "CDs", "userId": 234}
        //];


        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/"+userId+"/form");
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