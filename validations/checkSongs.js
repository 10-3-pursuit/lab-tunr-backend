// to validate inputs from CREATE route

const checkSongs = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ error: "Name is required" });
    } else if (!req.body.description) {
        res.status(400).json({ error: "Description is required" });
    } else {
        return next();
    }
};

module.exports = {
    checkSongs
};