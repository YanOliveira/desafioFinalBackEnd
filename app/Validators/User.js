"use strict";

class User extends require("./Validator") {
  get rules() {
    return {
      name: "required",
      email: "required|email|unique:users",
      password: "required|confirmed"
    };
  }
}

module.exports = User;
