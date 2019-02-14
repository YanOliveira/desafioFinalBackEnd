"use strict";

const Meetup = use("App/Models/Meetup");
const Database = use("Database");

class MeetupController {
  async index({ auth }) {
    const technologiesUser = Database.select("meetup_id")
      .from("technology_user")
      .where("user_id", auth.user.id)
      .innerJoin(
        "meetup_technology",
        "technology_user.technology_id",
        "meetup_technology.technology_id"
      );

    const meetups = await Meetup.query()
      .whereIn("id", technologiesUser)
      .with("technologies")
      .fetch();

    return meetups;
  }

  async store({ request }) {
    const { technologies, ...data } = request.only([
      "title",
      "description",
      "localization",
      "technologies",
      "file_id"
    ]);

    const trx = await Database.beginTransaction();

    const meetup = await Meetup.create(data, trx);
    await meetup.technologies().attach(technologies, null, trx);
    await trx.commit();
    await meetup.load("technologies");

    return meetup;
  }

  async show({ params }) {
    const meetup = await Meetup.findOrFail(params.id);
    await meetup.load("technologies");
    await meetup.load("users");
    return meetup;
  }
}

module.exports = MeetupController;
