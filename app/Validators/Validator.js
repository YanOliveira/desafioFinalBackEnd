"use strict";

const Antl = use("Antl");

class Validator {
  get validateAll() {
    return true;
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Validator;
