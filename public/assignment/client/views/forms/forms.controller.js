(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {

        var vm = this;

        function init() {

            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;

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


            for (var i = 0; i < vm.forms.length; i++) {
                if (vm.forms[i].title == vm.tempFormname) {

                    var newForm = {
                        "_id": vm.forms[i]._id,
                        "title": vm.formname,
                        "userId": vm.forms[i].userId
                    };

                    FormService
                        .updateFormById(newForm._id,newForm)
                        .then(function(response) {
                            vm.forms = response.data;
                            //console.log(vm.forms);
                        });

                    vm.formname = "";
                    break;
                }
            }


        }

        function deleteForm(index) {
            var formid = vm.forms[index]._id;

            FormService
                .deleteFormById(formid)
                .then(function (response) {
                    vm.forms = response.data;
                    //console.log(vm.forms);
                });

        }

        function selectForm(index) {
            vm.formname = vm.forms[index].title;
            vm.tempFormname = vm.formname;
        }


    }

})();