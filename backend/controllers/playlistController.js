const Playlist = require("../models/Playlist");

// POST /api/playlists/create
exports.createPlaylist = async (req, res) => {
  const { name, description, songs, isPublic } = req.body;

  try {
    const playlist = new Playlist({
      user: req.user._id,
      name,
      description,
      songs,
      isPublic,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd tworzenia playlisty", error: err.message });
  }
};

// GET /api/playlists
exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id })
      .populate("songs")
      .sort({ createdAt: -1 });
    res.status(200).json(playlists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd pobierania playlist", error: err.message });
  }
};

// GET /api/playlists/public/:id
exports.getPublicPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      isPublic: true,
    }).populate("songs");
    if (!playlist)
      return res
        .status(404)
        .json({ message: "Playlista nie istnieje lub jest prywatna" });
    res.status(200).json(playlist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd pobierania playlisty", error: err.message });
  }
};
