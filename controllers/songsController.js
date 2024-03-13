const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong, deleteSong, updateSong, orderByAsc, orderByDesc, getFavoriteSongs, getNotFavoriteSongs } = require('../queries/songs')
const {checkNameArtist, checkBoolean} = require('../validations/checkSongs.js')

// INDEX
// songs.get('/', async (req, res) => {
//     const allSongs = await getAllSongs()
//     if (allSongs[0]) res.status(200).json(allSongs)
//     else res.status(500).json({ error: "server error" })
// })

songs.get('/', async (req, res) => {
    const { order, is_favorite } = req.query
    try{
        if(order){
            if(order === "asc"){
                const orderedAsc = await orderByAsc()
                if (orderedAsc[0]) res.status(200).json(orderedAsc)
            } else if(order === "desc"){
                const orderedDesc = await orderByDesc()
                if (orderedDesc[0]) res.status(200).json(orderedDesc)
            }
        } else if(is_favorite){
            if(is_favorite === true || is_favorite === "true"){
                const favoriteSongs = await getFavoriteSongs()
                if(favoriteSongs[0])res.status(200).json(favoriteSongs)
            } else if(is_favorite === false || is_favorite === "false"){
                const notFavoriteSongs = await getNotFavoriteSongs()
                if(notFavoriteSongs[0]) res.status(200).json(notFavoriteSongs)
            }
        } else {
            const allSongs = await getAllSongs()
            if (allSongs[0]) res.status(200).json(allSongs)
        }
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
})

// SHOW
songs.get('/:id', async (req, res) => {
    const {id} = req.params
    const song = await getSong(id)
    if(song){
        res.json(song)
    } else {
        res.status(404).json({error: 'Song Not Found'})
    }
})

// CREATE
songs.post('/', checkNameArtist, checkBoolean, async (req, res) => {
    try {
        const song = await createSong(req.body)
        res.json(song)
    } catch (error) {
        res.status(400).json({ error: 'Song creation failed.'})
    }
})

// UPDATE 
songs.put('/:id', checkNameArtist, checkBoolean, async (req, res) => {
    const {id} = req.params
    if(id){
        const updatedSong = await updateSong(id, req.body)
        res.status(200).json(updatedSong) 
    } else {
        res.status(400).json({ error })
    }
})

// DELETE
songs.delete('/:id', async (req, res) => {
    const {id} = req.params
    const deletedSong = await deleteSong(id)
    if(deletedSong.id){
        res.status(200).json(deletedSong)
    } else {
        res.status(404).json('Song not found.')
    }
})

// BONUS



module.exports = songs;