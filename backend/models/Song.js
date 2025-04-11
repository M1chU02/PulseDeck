import { Schema, model } from "mongoose";

const SongSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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

export default model("Song", SongSchema);
