const express = require("express");

const PeopleController = require("../controllers/PeopleController.js");

const router = express.Router();

router.get("/people", PeopleController.index);
router.get("/people/:id", PeopleController.show);
router.post("/people", PeopleController.store);
router.put("/people/:id", PeopleController.update);
router.delete("/people/:id", PeopleController.destroy);

module.exports = router;
