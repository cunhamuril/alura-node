const express = require("express");

const LevelsController = require("../controllers/LevelsController.js");

const router = express.Router();

router.get("/levels", LevelsController.index);
router.get("/levels/:id", LevelsController.show);
router.post("/levels", LevelsController.store);
router.put("/levels/:id", LevelsController.update);
router.delete("/levels/:id", LevelsController.destroy);

module.exports = router;
