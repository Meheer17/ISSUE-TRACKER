const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    /////////////////////////////   POST   ////////////////////////////////////
  
    suite('POST', () => {

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

    /////////////////////////////   GET   ////////////////////////////////////

    suite('GET', () => {  //these get issues hav to be updated in the end... for u to pass

        test('View issues on a project: GET request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .get('/api/issues/project')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.length, 4); //be careful here as it uses the response so update this at the end....
                    done(); 
                });
        });

        test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
            chai
                .request(server)
                .get('/api/issues/project')
                .query({
                    issue_title: "Issues"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        issue_title: "Issues"
                    });
                    done();
                });
        });

        test('View issues on a project with multiple filters: GET request to /api/issues/{project}', () => {
            chai
                
        });

    });

});