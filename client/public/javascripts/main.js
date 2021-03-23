const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');
const navBlog = document.getElementById('nav-blob');
const buttons = document.getElementById('buttons');

hamburger.addEventListener('click', () => {
  navUL.classList.toggle('show');
  navBlog.classList.toggle('show-blob');
});

// functions
function getForm(question) {
  const form = document.getElementById(question);
  const idList = ['care-body', 'song-body', 'hope-body', 'miss-body', 'smile-body', 'appreciate-body'];
  let newId;

  if(question == 'form-1') {newId = idList[0]}
  else if(question == 'form-2') {newId = idList[1]}
  else if(question == 'form-3') {newId = idList[2]}
  else if(question == 'form-4') {newId = idList[3]}
  else if(question == 'form-5') {newId = idList[4]}
  else {newId = idList[5]}

  document.getElementById('index-body').id = newId;
  form.classList.toggle('hide');
  buttons.classList.toggle('buttons-hide');
}

// calling server
const api_root = "http://localhost:5000/answers";

const fetchAnswers = () => {
  axios.get(api_root)
      .then(response => {
          const answers = response.data.text;
          console.log(`GET list answers`, answers);
      })
      .catch(error => console.error(error));
};

// append answers to dom
const createLi = (answer) => {
  const li = document.createElement('li');
  // add user details to `li`
  li.textContent = `${answer}`;
  return li;
};

const appendToDOM = (answers) => {
  const ul = document.querySelector('.ul');
  //iterate over all answers
  answers[0].map(answer => {
      ul.appendChild(createLi(answer));
  });
  const form = document.querySelector('.forms');
  form.classList.toggle('hide');
};

// create new answer
const createSubmission = (answer) => {
  axios.post('http://localhost:5000/answers', answer)
      .then(response => {
          const addedSubmission = response.data;
          console.log(`POST: submission is added`, addedSubmission);
          // append to DOM
          appendToDOM([addedSubmission]);
      })
      .catch(error => console.error(error));
};

// event listener
const form = document.querySelectorAll('form');

const formEvent = form.forEach(item => { item.addEventListener('submit', event => {
    event.preventDefault();
    console.log(item);

    const answer = item.querySelector('#answer').value;
    const question = item.querySelector('#question').value;

    submission  = { answer, question };
    createSubmission(submission);
  });
});