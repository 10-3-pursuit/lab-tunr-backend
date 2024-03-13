const express = require('express');
const songs = express.Router();
const { getAllSongs, getSongById } = require("../queries/songs");
const { checkSongs } = require("../validations/checkSongs")

songs.get('/', async(req, res) => {
    const allSongs = await getAllSongs()
    if(allSongs[0]) res.status(200).json(allSongs);
    else res.status(500).json({ error: 'server error' });
});

// Get a single song by ID
songs.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const song = await getSongById(id);
        if (song) {
            res.status(200).json(song);
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        console.error(`Error fetching song with ID ${id}:`, error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = songs;