// to validate inputs from CREATE route

const checkSong = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ error: "Name is required" });
    } else if (!req.body.artist) {
        res.status(400).json({ error: "Artist is required" });
    } else {
        console.log("All necessary fields inputted")
        return next();
    }
};

const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body;
    if (
        is_favorite == "true" ||
        is_favorite == "false" ||
        is_favorite == undefined ||
        typeof is_favorite == "boolean"
    ) {
        console.log("received boolean");
        next();
    } else {
        res.status(400).json({ error: "is_favorite must be a boolean value" });
    }
};

//to validate edit fx
const checkID = (req, res, next) => {
    if(!req.body.id) {
        res.status(400).json({ error: "ID is required" })
    } else {
        console.log('received required id')
        return next();
    }
};

module.exports = {
    checkSong,
    checkBoolean,
    checkID
};