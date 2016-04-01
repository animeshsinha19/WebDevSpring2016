module.exports = function (app, formModel) {

    // GET /api/assignment/user/:userId/form
    app.get("/api/assignment/user/:userId/form", getFormsByUserId);

    // GET /api/assignment/form/:formId
    app.get("/api/assignment/form/:formId", getFormByFormId);

    // DELETE /api/assignment/form/:formId
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);

    // POST /api/assignment/user/:userId/form
    app.post("/api/assignment/user/:userId/form", createForm);

    // PUT /api/assignment/form/:formId
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function getFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findAllFormsForUser(userId)
            .then(function (response) {
                res.json(response);
            });


    }

    function getFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .getFormByFormId(formId)
            .then(function (response) {
                res.json(response);
            })

    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(function (response) {
                //need allforms by userid
                formModel
                    .findAllFormsForUser(response.userId)
                    .then(function(response2) {
                        res.json(response2);
                    });
            });
        //res.json(allForms);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormForUser(userId, form)
            .then(function (response) {
                //need allforms by userid
                //console.log(response);
                formModel
                    .findAllFormsForUser(response.userId)
                    .then(function(response2) {
                       res.json(response2);
                    });
            });
        //console.log(allForms);
        //res.json(allForms);

    }

    function updateFormByFormId(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        formModel
            .updateFormById(formId, newForm)
            .then(function(response) {
               //need allforms by userid
                formModel
                    .findAllFormsForUser(newForm.userId)
                    .then(function(response2) {
                        res.json(response2);
                    });
            });
        //console.log(form);
        //res.json(form);

    }

};