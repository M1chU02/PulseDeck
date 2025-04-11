import Song from "../models/Song.js";

// POST /api/songs/add
export async function addSong(req, res) {
  const { title, platform, url, embedId } = req.body;

  try {
    const newSong = new Song({
      user: req.user._id,
      title,
      platform,
      url,
      embedId,
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd dodawania utworu", error: err.message });
  }
}

// GET /api/songs/
export async function getUserSongs(req, res) {
  try {
    const songs = await Song.find({ user: req.user._id }) // FIX
      .sort({ addedAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd pobierania utworów", error: err.message });
  }
}
