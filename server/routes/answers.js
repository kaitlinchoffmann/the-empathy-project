const express = require('express');
const Submission = require('../models/submissions');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const answers = await Submission.getAnswers(req.params.qId);
    const answers = {
      text: "hello! i love you"
    }
    console.log(answers);
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
    const answer = await Submission.addAnswer(req.body.question, req.body.answer);
    console.log(answer);
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