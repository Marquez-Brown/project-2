const express = require("express");
const db = require("../models");

const router = express.Router();

//html routes
/**
 * Route to render landing page.
 */
router.get("/", (req, res) => {
  //db.Song.findall <-- how to get data from the database to the front end
  console.log("hello world");
  res.render("index", { test: "data values go here (in songsController.js)" });

  //db.Song.findall <-- how to get data from the database to the front end
  console.log("hello world");
  res.render("index", { test: "yo mama" });
});

// Route to list all songs currently in database
router.get("/songs", (req, res) => {
  db.Song.findAll()
    .then((allSongs) => {
      res.render("all-songs", { songs: allSongs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// ROUTE FOR ADDING NEW SONG
router.get("/songs/new", (req, res) => {
  db.Song.findAll()
    .then((allSongs) => {
      res.render("new-song", { songs: allSongs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// Route for one song
router.get("/songs/:id", (req, res) => {
  db.Song.findOne({
    where: { id: req.params.id },
  })
    .then((singleSong) => {
      res.render("song", singleSong.dataValues);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

//   HTML ROUTE FOR UPDATING A SONG
router.get("/songs/:id/edit", (req, res) => {
  db.Song.findOne({ where: { id: req.params.id } })
    .then((singleSong) => {
      res.render("edit-song", singleSong.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// API ROUTE FOR UPDATING A SONG
router.put("/api/songs/:id", (req, res) => {
  db.Song.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

// API ROUTE FOR DELETING A SONG
router.delete("/api/songs/:id", (req, res) => {
  db.Song.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

// Route to post a song into database
router.post("/api/songs", (req, res) => {
  db.Song.create({
    title: req.body.title,
    artist: req.body.artist,
    url: req.body.url,
  })
    .then((data) => {
      // alert("Song submitted?");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});


module.exports = router;
