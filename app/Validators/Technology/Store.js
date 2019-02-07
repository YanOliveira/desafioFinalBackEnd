"use strict";

class TechnologyStore extends require("../Validator") {
  get rules() {
    return {
      name: "required|unique:technologies"
    };
  }
}

module.exports = TechnologyStore;
