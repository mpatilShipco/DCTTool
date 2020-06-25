const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var http = require('http');


// exports.fileparser = (req, res) => {
//     start(req, res) {
//         return res.status(200).send("Email Sent Successfully.");
//     }    
// };

// exports.start = (req, res) => {
//   res.status(200).send("User Content.");
// };


// exports.end = (req, res) => {
//   res.status(200).send("End.");
// };

exports.fileparser = (filename) => {
  function start (req, res) {
        return res.status(200).send("Email Sent Successfully.");
    }
    function end (req, res) {
        return res.status(200).send("Email Sent Successfully.");
    }
};

module.exports = fileparser;

// class fileparser {
//     constructor(filename) {
//         this.filename = filename;
//         this.lastTime = null;
//     }

//     start(req, res) {
//         this.lastTime = 'test';
//         return res.status(200).send("Email Sent Successfully.");
//     }

    // uploadFilePython(req, res) {
    //     return "File Uploaded Successfully.";
    // }

    // sentSuccessMessage(req, res) {
    //     return res.status(200).send("Email Sent Successfully.");
    // }
// }

// module.exports = fileparser;