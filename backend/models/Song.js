const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ["YouTube", "Spotify", "SoundCloud"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  embedId: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Song", SongSchema);
