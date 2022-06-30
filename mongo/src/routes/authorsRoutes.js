import express from "express";

import AuthorsController from "../controllers/authorsController.js";

const router = express.Router();

router.get("/authors", AuthorsController.index);
router.get("/authors/:id", AuthorsController.show);
router.post("/authors", AuthorsController.store);
router.put("/authors/:id", AuthorsController.update);
router.delete("/authors/:id", AuthorsController.destroy);

export default router;
