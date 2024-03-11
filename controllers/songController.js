const express = require('express');
const songs = express.Router();
const { getAllSongs } = require("../queries/songs");

songs.get('/', async(req, res) => {
    console.log(getAllSongs);
});

module.exports = songs;