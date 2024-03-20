const express = require("express");
const { getPlaylist } = require('../queries/playlists.js')
// const songs = express.Router();
const songs = express.Router({ mergeParams: true });
const { 
    getAllSongs, 
    getSong, 
    createSong, 
    deleteSong, 
    updateSong, 
    orderByAsc, 
    orderByDesc, 
    getFavoriteSongs, 
    getNotFavoriteSongs 
} = require('../queries/songs')

const {
    checkNameArtist, 
    checkBoolean
} = require('../validations/checkSongs.js')

// INDEX
songs.get('/', async (req, res) => {
    const { order, is_favorite } = req.query
    const { playlist_id } = req.params
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
            const songs = await getAllSongs(playlist_id)
            const playlist = await getPlaylist(playlist_id)
            if (playlist.id){
                res.status(200).json({ ...playlist, songs })
            } else {
                res.status(500).json({ error: 'Songs not found or server error' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
})

// SHOW
songs.get('/:id', async (req, res) => {
    const {playlist_id, id} = req.params
    const song = await getSong(id)
    const playlist = await getPlaylist(playlist_id)
    if(song) res.json({ ...playlist, song })
    else res.status(404).json({error: 'Song Not Found'})
})

// CREATE
songs.post('/', checkNameArtist, checkBoolean, async (req, res) => {
    const { playlist_id } = req.params
    try {
        const song = await createSong({ ...req.body, playlist_id })
        res.status(200).json(song)
    } catch (error) {
        res.status(400).json({ error: 'Song creation failed.'})
    }
})

// UPDATE 
songs.put('/:id', checkNameArtist, checkBoolean, async (req, res) => {
    const { id, playlist_id } = req.params
    const updatedSong = await updateSong({ id, ...req.body, playlist_id })
    if(updatedSong.id) res.status(200).json(updatedSong) 
    else res.status(400).json({ error: "Song not found." })
})


// DELETE
songs.delete('/:id', async (req, res) => {
    const {id} = req.params
    const deletedSong = await deleteSong(id)
    if(deletedSong.id) res.status(200).json(deletedSong)
    else res.status(404).json('Song not found.')
})

module.exports = songs;