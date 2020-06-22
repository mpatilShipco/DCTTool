const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;


class fileparser {
    constructor(filename) {
        this.filename = filename;
        this.lastTime = null;
    }

    start() {
        this.lastTime = 'test';
    }

    // uploadFilePython(req, res) {
    //     return "File Uploaded Successfully.";
    // }

    // sentSuccessMessage(req, res) {
    //     return res.status(200).send("Email Sent Successfully.");
    // }
}

module.exports = fileparser;