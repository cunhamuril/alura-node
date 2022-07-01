const express = require("express");

const peopleRoutes = require("./peopleRoutes.js");
const levelsRoutes = require("./levelsRoutes.js");
const classesRoutes = require("./classesRoutes.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Curso de Node");
  });

  app.use(peopleRoutes);
  app.use(levelsRoutes);
  app.use(classesRoutes);
};

module.exports = routes;
