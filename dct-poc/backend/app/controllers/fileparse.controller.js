const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const fileparser = require("../factoryClasses/fileparser");

var jwt = require("jsonwebtoken");

exports.fileparse = (filename) => {
  return {
            start: function () {

            },
            end: function () {
            }
        }
};
