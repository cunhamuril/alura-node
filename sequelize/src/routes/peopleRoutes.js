const express = require("express");

const PeopleController = require("../controllers/PeopleController.js");
const PeopleEnrollmentsController = require("../controllers/PeopleEnrollmentsController");
const PeopleRestoreController = require("../controllers/PeopleRestoreController.js");
const PeopleCancelController = require("../controllers/PeopleCancelController.js");

const router = express.Router();

router.get("/people", PeopleController.index);
router.get("/people/:id", PeopleController.show);
router.post("/people", PeopleController.store);
router.put("/people/:id", PeopleController.update);
router.delete("/people/:id", PeopleController.destroy);

router.get("/people/:studentId/enrollments", PeopleEnrollmentsController.index);

router.get(
  "/people/:studentId/enrollments/:enrollmentId",
  PeopleEnrollmentsController.show
);

router.post("/people/:id/restore", PeopleRestoreController.store);

router.post("/people/:id/cancel", PeopleCancelController.store);

module.exports = router;
