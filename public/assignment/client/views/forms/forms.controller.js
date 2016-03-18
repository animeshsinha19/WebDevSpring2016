(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var vm = this;

        function init() {
            if ($rootScope.newUser) {
                FormService
                    .findAllFormsForUser($rootScope.newUser._id)
                    .then(function (response) {
                        vm.forms = response.data;
                        //console.log(vm.forms);

                    });


            }

        }

        init();


        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;


        function addForm() {
            var form = {
                "title": vm.formname,
                "userId": $rootScope.newUser._id
            };
            if (form.title)
                FormService
                    .createFormForUser(form.userId, form)
                    .then(function (response) {
                        vm.forms = response.data;
                        //console.log(vm.forms);
                    });

            vm.formname = "";
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

                    $scope.formname = "";
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