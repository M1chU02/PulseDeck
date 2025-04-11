import { Router } from "express";
const router = Router();
import { protect } from "../middleware/authMiddleware.js"; // Correct import

import {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylistById,
} from "../controllers/playlistController.js";

// POST /api/playlists/create
router.post("/create", protect, createPlaylist);

// GET /api/playlists
router.get("/", protect, getUserPlaylists);

// GET /api/playlists/public/:id
router.get("/public/:id", getPublicPlaylistById);

export default router;
