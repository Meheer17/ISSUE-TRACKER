const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let deleteID;

suite('Functional Tests', function() {

    suite("Routing Tests", () => {

    /////////////////////////////   POST-3   ////////////////////////////////////
  
    suite('3 Post request Tests', () => {

        test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .post('/api/issues/project')
                .send({
                    issue_title: "Issues",
                    issue_text: "Functions",
                    created_by: "FCC",
                    assigned_to: "mahi",
                    status_text: "Not doneo"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    deleteID = res.body._id;
                    assert.equal(res.body.issue_title, "Issues");
                    assert.equal(res.body.issue_text, "Functions");
                    assert.equal(res.body.created_by, "FCC");
                    assert.equal(res.body.assigned_to, "mahi");
                    assert.equal(res.body.status_text, "Not doneo");
                    done();
                });
        });

        test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
            chai 
                .request(server)
                .post('/api/issues/project')
                .set("content-type", "application/json")
                .send({
                    issue_text: "issue",
                    issue_title: "henlo",
                    created_by: "mahi"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.issue_text, "issue");
                    assert.equal(res.body.issue_title, "henlo");
                    assert.equal(res.body.created_by, "mahi");
                    done();
                });
        });

        test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .post('/api/issues/project')
                .set("content-type", "application/json")
                .send({
                    issue_text: "",
                    issue_title: "",
                    created_by: "mahi",
                    assigned_to: "",
                    status_text: ""
                })
                .end(function (err, res) {
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                });
        });

    });

    /////////////////////////////   GET-3   ////////////////////////////////////

    suite('3 Get request Tests', () => {  //these get issues hav to be updated in the end... for u to pass

        test('View issues on a project: GET request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .get('/api/issues/get')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.length, 1); //be careful here as it uses the response so update this at the end....
                    done(); 
                });
        });

        test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .get('/api/issues/get')
                .query({
                    issue_title: "GET"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "61961ac7775df68bd8582b3c", //update
                        issue_title: "GET",
                        issue_text: "GET",
                        created_on: "2021-11-18T09:20:07.217Z", //update
                        updated_on: "2021-11-18T09:20:07.217Z", //update
                        created_by: "GET",
                        assigned_to: "GET",
                        open: true,
                        status_text: "GET",
                    });
                    done();
                });
        });

        test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .get('/api/issues/get')
                .query({
                    issue_title: "GET",
                    issue_text: "GET",
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "61961ac7775df68bd8582b3c", //update
                        issue_title: "GET",
                        issue_text: "GET",
                        created_on: "2021-11-18T09:20:07.217Z", //update
                        updated_on: "2021-11-18T09:20:07.217Z", //update
                        created_by: "GET",
                        assigned_to: "GET",
                        open: true,
                        status_text: "GET",
                    });
                done();

                });

        });

    });

    /////////////////////////////   PUT-5   ////////////////////////////////////

    suite('5 Put request Tests', () => {

        test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {
            chai
                .request(server)
                .put('/api/issues/project')
                .send({
                    _id: "6195551698b6a594c948dcc8", //update accordingly....
                    issue_title: "different",
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, "6195551698b6a594c948dcc8" ); //update
                    done();
                });
        });

        test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
            chai 
                .request(server)
                .put('/api/issues/project')
                .send({
                    _id: "6195551698b6a594c948dcc8", //update
                    issue_title: "henlo",
                    issue_text: "hehe"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, "6195551698b6a594c948dcc8" ); //update
                    done();
                });
        });

        test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .put('/api/issues/project')
                .send({
                    issue_title: "hehe",
                    issue_text: "idc"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                });
        });

        test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
            chai 
                .request(server)
                .put('/api/issues/project')
                .send({
                    _id: "ksjdfnkajfsns"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "no update field(s) sent");
                    done();
                })
        });

        test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .put('/api/issues/project')
                .send({
                    _id: "wrong id ops",
                    issue_text: "wrong"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not update");
                    done();
                });
        });

    });

    /////////////////////////////   DELETE-3   ////////////////////////////////////

    suite("3 DELETE request Tests", () => {

        test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .delete('/api/issues/apitest')
                .send({
                    _id: "6196211f94683cd15ed4c359" //update
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);                    
                    assert.equal(res.body.result, "successfully deleted");
                    done();
                });
        });

        test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .delete('/api/issues/projects')
                .send({
                    _id: "hsfddsfsd"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not delete");
                    done();
                });
        });

        test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .delete('/api/issues/projects')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                });
        });

    });

    });

});