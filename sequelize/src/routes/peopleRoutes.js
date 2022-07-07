const express = require("express");

const PeopleController = require("../controllers/PeopleController.js");
const EnrollmentByStudentController = require("../controllers/EnrollmentByStudentController.js");
const PeopleRestoreController = require("../controllers/PeopleRestoreController.js");

const router = express.Router();

router.get("/people", PeopleController.index);
router.get("/people/:id", PeopleController.show);
router.post("/people", PeopleController.store);
router.put("/people/:id", PeopleController.update);
router.delete("/people/:id", PeopleController.destroy);

router.get(
  "/people/:studentId/enrollments",
  EnrollmentByStudentController.index
);

router.get(
  "/people/:studentId/enrollments/:enrollmentId",
  EnrollmentByStudentController.show
);

router.post("/people/:id/restore", PeopleRestoreController.store);

module.exports = router;
