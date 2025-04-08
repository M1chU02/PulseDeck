const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addSong, getUserSongs } = require("../controllers/songController");

// POST /api/songs/add
router.post("/add", protect, addSong);

// GET /api/songs/
router.get("/", protect, getUserSongs);

module.exports = router;
