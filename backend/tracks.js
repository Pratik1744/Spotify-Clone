const express = require("express");
const router = express.Router();
const Track = require("../models/Track");

// GET all tracks
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single track by ID
router.get("/:id", async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ message: "Track not found" });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new track
router.post("/", async (req, res) => {
  const track = new Track({
    title: req.body.title,
    artist: req.body.artist,
    src: req.body.src,
    cover: req.body.cover,
  });

  try {
    const newTrack = await track.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a track
router.put("/:id", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTrack) return res.status(404).json({ message: "Track not found" });
    res.json(updatedTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a track
router.delete("/:id", async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    if (!deletedTrack) return res.status(404).json({ message: "Track not found" });
    res.json({ message: "Track deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
