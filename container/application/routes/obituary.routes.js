module.exports = app => {
  const obituary = require("../controllers/obituary.controllers");

  const router = require("express").Router();

  // Retrieve a holiday
  router.get("/deaths", obituary.get);

  app.use(router);
};
