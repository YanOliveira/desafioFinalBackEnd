"use strict";

const Exception = use("App/Exceptions/Exception");

class UserUpdate extends require("../Validator") {
  async authorize() {
    if (this.ctx.auth.user.id != this.ctx.params.id) {
      throw new Exception(
        "Você não tem permissão para alterar este usuário!",
        401
      );
      return false;
    }
    return true;
  }

  get rules() {
    return {
      new_password: "confirmed"
      // new_password: `${
      //   this.ctx.request.input('old_password')
      //     ? 'required|confirmed'
      //     : 'confirmed'
      // }`
    };
  }
}

module.exports = UserUpdate;
