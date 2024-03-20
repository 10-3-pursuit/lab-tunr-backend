const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, inputSong, deleteSong, updateSong } = require('../queries/songs');

const { checkSchema, check, validationResult } = require("express-validator");

const reviewsController = require('./reviewsController.js')

const songValidations = require('../validations/validationsSchema');

songs.use('/:song_id/reviews', reviewsController)



songs.get('/', async (req, res) => {
    try {
        const allSongs = await getAllSongs();
        res.status(200).json(allSongs);
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

songs.get('/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const song = await getSong(id);
        if (song) {
            res.json(song);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

songs.post('/', checkSchema(songValidations), async (req, res) => {
   try {
    const song = await inputSong(req.body);
    res.json(song);
   } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

songs.put("/:id", [
    check('id').isNumeric().withMessage('Invalid song ID'),
    checkSchema(songValidations)
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const updatedSong = await updateSong(id, req.body);
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

songs.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSong = await deleteSong(id);
        if (deletedSong.id) {
            res.status(200).json(deletedSong);
        } else {
            res.status(404).json("song not found");
        }
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = songs;
