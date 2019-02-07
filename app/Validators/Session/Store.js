"use strict";

class SessionStore extends require("../Validator") {
  get rules() {
    return {
      email: "required|email",
      password: "required"
    };
  }
}

module.exports = SessionStore;
