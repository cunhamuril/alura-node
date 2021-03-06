const express = require("express");

const ClassesController = require("../controllers/ClassesController.js");
const ClassesRestoreController = require("../controllers/ClassesRestoreController.js");
const ClassEnrollmentsController = require("../controllers/ClassEnrollmentsController.js");

const router = express.Router();

router.get("/classes", ClassesController.index);
router.get("/classes/:id", ClassesController.show);
router.post("/classes", ClassesController.store);
router.put("/classes/:id", ClassesController.update);
router.delete("/classes/:id", ClassesController.destroy);

router.post("/classes/:id/restore", ClassesRestoreController.store);

router.get("/classes/:id/enrollments", ClassEnrollmentsController.index);

module.exports = router;
