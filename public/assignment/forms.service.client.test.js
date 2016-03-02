(function () {
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
                "title": form,
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
                        "title": allForms[i].title
                    };
                    userForms.push(formdetails);
                }
            }
            callback(userForms);
        }

        function deleteFormById() {

        }

        function updateFormById() {

        }

    }
})();