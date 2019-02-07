"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User/Store");
Route.post("sessions", "SessionController.store").validator("Session/Store");

Route.group(() => {
  Route.put("users/:id", "UserController.update").validator("User/Update");
}).middleware(["auth"]);

Route.resource("technologies", "TechnologyController")
  .apiOnly()
  .validator(new Map([[["technologies.store"], ["Technology/Store"]]]));
