const express = require('express');
const Submission = require('../models/submissions');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const answers = await Submission.getAnswers(req.params.qId);
    const answers = {
      text: "Welcome To The Empathy Project!"
    }
    res.send(answers);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
  /* 
  Need to get the question on/answered as well
  "find all answers (max 25 - random) from question
  2. Send object with all answers, including one just
  done if submitted. just grab 25, including latest 
  one."
  */
});

router.post('/', async (req, res) => {
  try {
    let answer;
    if((req.body.answer) == "skip") {
      answer = await Submission.getAnswers(req.body.question);
    } else {
      answer = await Submission.addAnswer(req.body.question, req.body.answer);
    }
    res.send(answer);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// not super necessary right now.
router.delete('/:id', (req, res) => {
  res.send("Answer Deleted");
});

router.put('/:id', (req, res) => {
  res.send("Answer Updated");
});

module.exports = router;