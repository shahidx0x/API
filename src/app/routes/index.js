const AuthRoutes = require("../modules/auth/auth.route");
const express = require("express");
const TaskRoutes = require("../modules/task/task.route");
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/task",
    route: TaskRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = router;
