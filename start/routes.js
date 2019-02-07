"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User/Store");
Route.post("sessions", "SessionController.store").validator("Session/Store");
