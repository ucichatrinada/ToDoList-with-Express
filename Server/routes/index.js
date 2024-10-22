const express = require("express");
const route = express.Router();

const todoRoute = require("./todo-route");
const authRoute = require("./auth-route");

route.use("/auth", authRoute);
route.use("/todos", todoRoute);


module.exports = route;