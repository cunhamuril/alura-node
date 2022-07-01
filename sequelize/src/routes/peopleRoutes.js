const express = require("express");

const PeopleController = require("../controllers/PeopleController.js");

const router = express.Router();

router.get("/People", PeopleController.index);
router.get("/People/:id", PeopleController.show);
router.post("/People", PeopleController.store);
router.put("/People/:id", PeopleController.update);
router.delete("/People/:id", PeopleController.destroy);

module.exports = router;
