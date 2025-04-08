const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylistById,
} = require("../controllers/playlistController");

// POST /api/playlists/create
router.post("/create", protect, createPlaylist);

// GET /api/playlists
router.get("/", protect, getUserPlaylists);

// GET /api/playlists/public/:id
router.get("/public/:id", getPublicPlaylistById);

module.exports = router;
