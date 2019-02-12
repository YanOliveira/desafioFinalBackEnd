"use strict";

const Meetup = use("App/Models/Meetup");
const Database = use("Database");

class SubscriptionController {
  async index({ request, params, auth }) {
    const meetupsUser = Database.select("meetup_id")
      .from("meetup_user")
      .where("user_id", auth.user.id);

    const { registered } = request.get();
    if (registered === "true") {
      const meetups = await Meetup.query()
        .whereIn("id", meetupsUser)
        .with("technologies")
        .fetch();
      return meetups;
    } else {
      const meetups = await Meetup.query()
        .whereNotIn("id", meetupsUser)
        .with("technologies")
        .fetch();
      return meetups;
    }
  }

  async store({ params, auth }) {
    const meetup = await Meetup.findByOrFail("id", params.id);
    await meetup.users().attach(auth.user.id);
    await meetup.load("users");
    return meetup;
  }
}

module.exports = SubscriptionController;
