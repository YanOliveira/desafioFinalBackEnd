"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");
const Exception = use("App/Exceptions/Exception");

class UserController {
  async store({ request }) {
    const data = request.only(["name", "email", "password"]);
    const user = await User.create(data);
    return user;
  }

  async update({ params, request, response, auth, error }) {
    const user = await User.findByOrFail("id", params.id);
    const data = request.all();

    if (!!data.old_password) {
      const passIsSame = await Hash.verify(data.old_password, user.password);
      if (!passIsSame) {
        throw new Exception("A senha antiga está incorreta!", 400);
      }
      if (!data.new_password) {
        throw new Exception("Digite a nova senha e a confirmação!", 400);
      }
      user.password = data.new_password;
    }

    user.name = data.name;
    await user.save();
    return user;
  }
}

module.exports = UserController;
