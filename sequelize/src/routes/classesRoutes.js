const express = require("express");

const ClassesController = require("../controllers/ClassesController.js");

const router = express.Router();

router.get("/classes", ClassesController.index);
router.get("/classes/:id", ClassesController.show);
router.post("/classes", ClassesController.store);
router.put("/classes/:id", ClassesController.update);
router.delete("/classes/:id", ClassesController.destroy);

module.exports = router;
