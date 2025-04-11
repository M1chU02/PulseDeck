import { Router } from "express";
const router = Router();
import { protect } from "../middleware/authMiddleware.js";

import { addSong, getUserSongs } from "../controllers/songController.js";

// POST /api/songs/add
router.post("/add", protect, addSong);

// GET /api/songs/
router.get("/", protect, getUserSongs);

export default router;
