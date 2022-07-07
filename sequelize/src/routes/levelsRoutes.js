const express = require("express");

const LevelsController = require("../controllers/LevelsController.js");
const LevelsRestoreController = require("../controllers/LevelsRestoreController.js");

const router = express.Router();

router.get("/levels", LevelsController.index);
router.get("/levels/:id", LevelsController.show);
router.post("/levels", LevelsController.store);
router.put("/levels/:id", LevelsController.update);
router.delete("/levels/:id", LevelsController.destroy);

router.post("/levels/:id/restore", LevelsRestoreController.store);

module.exports = router;
