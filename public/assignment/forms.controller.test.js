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
            FormService.createFormForUser($rootScope.newUser._id, $scope.formname,
                function ($response) {
                    $scope.forms.push($response);
                });

        }

        function updateForm() {

        }

        function deleteForm() {

        }

        function selectForm() {

        }


    }

})();