module.exports = app => {
  const holidays = require("../controllers/obituary.controllers");

  const router = require("express").Router();

  // Retrieve a holiday
  router.get("/api/deaths/resume/:start/:end", holidays.get);

  app.use(router);
};
