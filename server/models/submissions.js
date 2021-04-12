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
  const questions = await Submission.find();
  // console.log(questions);
  return questions;
}

function getId(qId) {
  if(qId == "q1") { qId = "60745a3f52a0c82d8eb66dc6"; }
  else if(qId == "q2") { qId = "60745a649544362db8f1bd24"; }
  else if(qId == "q3") { qId = "60745a7387b4b82dccae1987"; }
  else if(qId == "q4") { qId = "60745aac8b4d472e0b0be60c"; }
  else if(qId == "q5") { qId = "60745a9d6104452df6610df0"; }
  else { qId = "60745a85f973f32de11c8d6c"; }
  return qId;
}
async function getAnswers(qId) {
  qId = getId(qId);

  const question = await Submission.findById(qId);
  if(question) {
    return question.subs.answers;
  } else throw Error("Question not found");
}

// add answer to question
async function addAnswer(qId, answer) {
  qId = getId(qId);

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