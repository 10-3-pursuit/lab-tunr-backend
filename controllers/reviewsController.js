const express = require("express");

const reviews = express.Router({ mergeParams: true });

// Queries
const {
  getAllReviews,
  getReview,
  newReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews");

const { getSong } = require('../queries/songs.js');


// INDEX
reviews.get('/', async (req, res) => {
  const { song_id } = req.params
  const reviews = await getAllReviews(song_id)
  const song = await getSong(song_id)
  if (song.id) {
    res.status(200).json({ ...song, reviews })
  } else {
    res.status(500).json({ error: 'song not found or server error' })
  }
});


// SHOW
reviews.get('/:id', async (req, res) => {
  const { song_id, id } = req.params
  const review = await getReview(id)
  const song = await getSong(song_id)
  if (review) {
    res.json({ ...song, review })
  } else {
    res.status(404).json({ error: 'not found' })
  }
})

// create
// controllers/reviewsController.js
reviews.post('/', async (req, res) => {
  const { song_id } = req.params
  const review = await newReview({...req.body, song_id })
  res.status(200).json(review)
})

// UPDATE
reviews.put('/:id', async (req, res) => {
  const { id, song_id } = req.params
  console.log(id, req.params.song_id)
  const updatedReview = await updateReview({ song_id, id, ...req.body })
  if (updatedReview.id) {
    res.status(200).json(updatedReview)
  } else {
    res.status(404).json('Review not found')
  }
})



// DELETE
reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = reviews;