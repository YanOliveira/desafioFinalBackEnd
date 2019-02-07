"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");

class UserController {
  async store({ request }) {
    const data = request.only(["name", "email", "password"]);
    const user = await User.create(data);
    return user;
  }

  async update({ params, request, response, auth, error }) {
    if (auth.user.id != params.id) {
      return response.status(401).send({
        error: {
          message: "Você não tem permissão para alterar este usuário! :("
        }
      });
    }

    const user = await User.findByOrFail("id", params.id);
    const data = request.all();

    if (!!data.old_password) {
      const passIsSame = await Hash.verify(data.old_password, user.password);
      if (!passIsSame) {
        return response.status(400).send({
          error: {
            message: "A senha antiga está incorreta! :("
          }
        });
      }
      if (!data.new_password) {
        return response.status(400).send({
          error: {
            message: "Digite a nova senha e a confirmação!"
          }
        });
      }
      user.password = data.new_password;
    }
    user.name = data.name;
    await user.save();
    return user;
  }
}

module.exports = UserController;
