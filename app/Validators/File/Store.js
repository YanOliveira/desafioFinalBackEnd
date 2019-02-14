"use strict";

class FileStore {
  get rules() {
    return {
      file: "required|file"
    };
  }
}

module.exports = FileStore;
