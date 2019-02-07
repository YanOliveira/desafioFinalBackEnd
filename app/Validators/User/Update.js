"use strict";

class UserUpdate extends require("../Validator") {
  get rules() {
    return {
      new_password: "confirmed"
    };
  }
}

module.exports = UserUpdate;
