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
      res.render("top-songs", { songs: allSongs });
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
      res.render("single-song", singleSong.dataValues);
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

// ROUTE FOR TESTING ALL SONGS
router.get("/test", (req, res) => {
  db.Song.findAll()
    .then((allSongs) => {
      res.render("all-songs", { songs: allSongs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// ROUTE FOR TESTING ONE SONG
router.get("/test/:id", (req, res) => {
  db.Song.findOne({
    where: { id: req.params.id },
  })
    .then((singleSong) => {
      res.render("test", singleSong.dataValues);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

// /**
//  * Route to render the new train form.
//  */
// router.get("/trains/new", (req, res) => {
//   res.render("new-train");
// });

// /**
//  * Route to pull train data from the database
//  * Render the train data to a pre-populate form.
//  */
// router.get("/trains/:id/edit", (req, res) => {
//   db.Train.findOne({ where: { id: req.params.id } })
//     .then((singleTrain) => {
//       res.render("edit-train", singleTrain.dataValues);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).end();
//     });
// });

// /**
//  * Display information about a single train.
//  */
// router.get("/trains/:id", (req, res) => {
//   db.Train.findOne({
//     where: { id: req.params.id },
//   })
//     .then((singleTrain) => {
//       // console.log(singleTrain.dataValues);
//       res.render("single-train", singleTrain.dataValues);
//     })
//     .catch((err) => {
//       res.status(500).end();
//     });
// });

// /**
//  * API Route to create a new train.
//  */
// router.post("/api/trains", (req, res) => {
//   db.Train.create(req.body)
//     .then((createdTrain) => {
//       res.json(createdTrain);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).end();
//     });
// });

// /**
//  * API Route to update an existing train by ID
//  */
// router.put("/api/trains/:id", (req, res) => {
//   db.Train.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).end();
//     });
// });

// /**
//  * API Route to delete a train by ID
//  */
// router.delete("/api/trains/:id", (req, res) => {
//   db.Train.delete({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).end();
//     });
// });

module.exports = router;
