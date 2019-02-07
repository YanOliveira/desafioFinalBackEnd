"use strict";

class UserStore extends require("../Validator") {
  get rules() {
    return {
      name: "required",
      email: "required|email|unique:users",
      password: "required|confirmed"
    };
  }
}

module.exports = UserStore;
