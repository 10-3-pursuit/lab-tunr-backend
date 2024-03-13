const checkStringInputs = (req, res, next) => {
  const { name, artist, genre, song_duration } = req.body;
  if (name && artist && genre && song_duration) {
    return next();
  } else {
    res.status(400).json({ error: "Input is required" });
  }
};

const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;
  if (
    is_favorite == true ||
    is_favorite == false ||
    is_favorite == undefined ||
    typeof is_favorite == "boolean"
  ) {
    return next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};

module.exports = { checkStringInputs, checkBoolean };
