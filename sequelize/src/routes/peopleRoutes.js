const express = require("express");

const PeopleController = require("../controllers/PeopleController.js");

const router = express.Router();

router.get("/people", PeopleController.index);

module.exports = router;
