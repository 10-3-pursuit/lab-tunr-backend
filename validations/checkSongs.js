
const checkSongInputs = (req, res, next) => {
    if (!req.body.name) {
         res.status(400).json({ error: "Name is required"})
    }else if (!req.body.artist) {
         res.status(400).json({ error: "artist is required"})
    }else if (!req.body.album) {
        res.status(400).json({ error: "album is required"})
    }else if (!req.body.time) {
        res.status(400).json({ error: "time is required"})
    }else if (!req.body.is_favorite) {
        res.status(400).json({ error: "is_favorite is required"})
    }else {
        return next();
    }
}

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

module.exports = { checkSongInputs, checkBoolean}