(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {


        if ($rootScope.newUser)
            FormService.findAllFormsForUser(
                $rootScope.newUser._id,
                function ($response) {
                    $scope.forms = $response;
                });


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm() {
            var form = {
                "title": $scope.formname,
                "userId": $rootScope.newUser._id
            };

            FormService.createFormForUser(form.userId, form,
                function ($response) {
                    $scope.forms.push($response);
                });

        }

        function updateForm() {


            for (var i = 0; i < $scope.forms.length; i++) {
                if ($scope.forms[i].title == $scope.tempFormname) {

                    var newForm = {
                        "_id": $scope.forms[i]._id,
                        "title": $scope.formname,
                        "userId": $scope.forms[i].userId
                    };

                    FormService.updateFormById(
                        newForm._id,
                        newForm,
                        function ($response) {
                            var updatedForm = $response;
                            $scope.forms[i].title = updatedForm.title;
                        });


                    break;
                }
            }


        }

        function deleteForm(index) {
            var formid = $scope.forms[index]._id;

            FormService.deleteFormById(formid,
                function ($response) {
                    $scope.forms = $response;
                });

        }

        function selectForm(index) {
            $scope.formname = $scope.forms[index].title;
            $scope.tempFormname = $scope.formname;
        }


    }

})();