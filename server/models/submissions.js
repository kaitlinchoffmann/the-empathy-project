const mongoose = require('mongoose');

//SCHEMA set-up
const submissionSchema = new mongoose.Schema({
  subs: {
    question: String,
    answers: { 
      type: [String], 
      createdAt: { type: Date, default: Date.now },
      required: "Please provide an answer." 
    },

  }
});

//make SCHEMA into a model
const Submission = mongoose.model("Submission", submissionSchema);

/* =========================== 
++++++++++ FUNCTIONS +++++++++
=========================== */ 
// get all answers from specific question:
async function getQuestions() {
  const questions = await Submission.subs.find();
  return questions;
}

async function getAnswers(qId) {
  const answers = await Submission.subs.findById(qId);
  return answers;
}

// add answer to question
async function addAnswer(qId, answer) {
  if(qId == "q1") { qId = "604fad980521b9920b5043d7"; }
  else if(qId == "q2") { qId = "604fad2e257a1a91e0ef85d9"; }
  else if(qId == "q3") { qId = "604faedb51caa692ae1caa5a"; }
  else if(qId == "q4") { qId = "604fae1f2422859244125928"; }
  else if(qId == "q5") { qId = "604faea3de9bc9928b34616a"; }
  else { qId = "604fae588182f99266705e21"; }

  const question = await Submission.findById(qId);
  if(question) {
    await question.subs.answers.push(answer);
    question.save();
    return question.subs.answers;
  } else throw Error("Question not found");
}

// create question
async function createQuestion(question2) {  
  try { 
    await Submission.create({
      subs: {
        question: question2
      }
    });
  } catch(err) {
    throw err;
  }
}

module.exports ={ 
  Submission, addAnswer, getAnswers, createQuestion, getQuestions 
};