const mongoose = require('mongoose');
const {Schema} = mongoose;

const IssueSchema = new Schema({
    issue_title: {type: String, required: true},
    issue_text: {type: String, required:true},
    created_by: {type: String, required:true},
    assigned_to: String,
    open: Boolean,
    status_text: String
} ,
 { timestamps: { createdAt: "created_on", updatedAt: "updated_on" }} );
const Issue = mongoose.model("Issue", IssueSchema);

const ProjectSchema = new Schema({
    name: {type: String, required: true},
    issues: [IssueSchema]
});
const Project = mongoose.model("Project", ProjectSchema);

exports.Issue = Issue;
exports.Project = Project;