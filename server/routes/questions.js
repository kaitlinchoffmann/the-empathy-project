const express = require('express');
const Submission = require('../models/submissions');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const question = await Submission.getQuestions();
    res.send(question);
    // res.render("landing.ejs");
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const question = await Submission.createQuestion(req.body.question);
    res.send(question);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// not super necessary right now.
router.delete('/:id', (req, res) => {
  res.send("Question Deleted");
});

module.exports = router;