//fx to validate the name and artist input
const checkNameAndArtist = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Name is required" });
  } else if (!req.body.artist) {
    res.status(400).json({ error: "Artist is required" });
  } else {
    return next();
  }
};

//fx to validate the length of album title
const checkAlbum = (req, res, next) => {
  if (req.body.album.length <= 2) {
    res.status(400).json({ error: "Album title must be 3 characters or more" });
  } else {
    return next();
  }
};

// fx to validate the length and data type of time
const checkTime = (req, res, next) => {
  console.log(req.body.time);
};

// fx to validate the is_favorite entry (must be a BOOLEAN)
const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;

  if (
    is_favorite == "true" ||
    is_favorite == "false" ||
    typeof is_favorite == "boolean"
  ) {
    console.log("received boolean");
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};

module.exports = { checkNameAndArtist, checkBoolean, checkAlbum, checkTime };
