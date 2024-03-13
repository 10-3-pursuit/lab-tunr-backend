const express = require('express');
const songs = express.Router();
const { getAllSongs, getSongById, addNewSong, updateSong, deleteSong } = require("../queries/songs");
const { checkSong, checkBoolean, checkID } = require("../validations/checkSong");

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

// add new song (create)
songs.post('/', checkSong, checkBoolean, async (req, res) => {
    try {
        console.log(req.body); // new song to be added
        const song = await addNewSong(req.body)
        res.json(song)
    } catch (error) {
        res.status(400).json({ error })
    }
});

// edit
songs.put('/:id', checkID, async (req, res) => {
    const { id } = req.params;
    if (id) {
        const updatedSong = await updateSong(id, req.body);
        res.status(200).json(updatedSong);
        console.log('song successfully updated');
    } else {
        res.status(400).json({ error });
    }
});

songs.delete("/:id", checkID, async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
        res.status(200).json(deletedSong);
    } else {
        res.status(404).json("Song not found");
    }
});

module.exports = songs;