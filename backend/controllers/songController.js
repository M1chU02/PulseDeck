const Song = require("../models/Song");

// POST /api/songs/add
exports.addSong = async (req, res) => {
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
};

// GET /api/songs/
exports.getUserSongs = async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user._id }).sort({ addedAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd pobierania utworów", error: err.message });
  }
};
