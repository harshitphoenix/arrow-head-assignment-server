import express from "express";
import {
  getDatabaseSchema,
  addMovie,
  updateMovie,
  getMovies,
} from "./database.controller";

const router = express.Router();

router.get("/get-schema", getDatabaseSchema);
router.post("/get-movies", getMovies);
router.post("/add-movie", addMovie);
router.patch("/update-movie", updateMovie);
export default router;
