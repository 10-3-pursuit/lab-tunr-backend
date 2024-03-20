// Function to validate the name and artist input
const checkNameAndArtist = (req, res, next) => {
  // Check if name is provided in the request body
  if (!req.body.name) {
    // Send an error response if name is missing
    res.status(400).json({ error: "Name is required" });
  } else if (!req.body.artist) {
    // Check if artist is provided in the request body
    // Send an error response if artist is missing
    res.status(400).json({ error: "Artist is required" });
  } else {
    // Continue to the next middleware function if both name and artist are provided
    return next();
  }
};

// Function to validate the length of album title
const checkAlbum = (req, res, next) => {
  // Check if album title length is less than or equal to 2 characters
  if (req.body.album.length <= 2) {
    // Send an error response if album title length is less than or equal to 2 characters
    res.status(400).json({ error: "Album title must be 3 characters or more" });
  } else {
    // Continue to the next middleware function if album title length is valid
    return next();
  }
};

// Function to validate the length and data type of time
const checkTime = (req, res, next) => {
  // Check if time length is not 4 or 5 characters
  if (req.body.time.length < 4 || req.body.time.length > 5) {
    // Send an error response if time length is not 4 or 5 characters
    res.status(400).json({ error: "Time must be either 4 or 5 characters" });
  } else {
    // Continue to the next middleware function if time length is valid
    return next();
  }
};

// Function to validate the is_favorite entry (must be a BOOLEAN)
const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;

  // Check if is_favorite is either "true", "false", or a boolean value
  if (
    is_favorite == "true" ||
    is_favorite == "false" ||
    typeof is_favorite == "boolean"
  ) {
    // Log a message if is_favorite is valid
    console.log("Received boolean");
    // Continue to the next middleware function
    next();
  } else {
    // Send an error response if is_favorite is not a valid boolean value
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};

// Exporting the validation functions to be used in other files
module.exports = { checkNameAndArtist, checkBoolean, checkAlbum, checkTime };
