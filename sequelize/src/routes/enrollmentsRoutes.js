const express = require("express");

const EnrollmentsController = require("../controllers/EnrollmentsController.js");

const router = express.Router();

router.get("/enrollments", EnrollmentsController.index);
router.get("/enrollments/:id", EnrollmentsController.show);
router.post("/enrollments", EnrollmentsController.store);
router.put("/enrollments/:id", EnrollmentsController.update);
router.delete("/enrollments/:id", EnrollmentsController.destroy);

module.exports = router;
