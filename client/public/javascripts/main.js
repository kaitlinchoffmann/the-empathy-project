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

const appendToDOM = (answers, question) => {
  let h1;
  if(question == "q1") { h1 = "What do you want people to care about?"; }
  else if(question == "q2") { h1 = "What song is helping you through lately?"; }
  else if(question == "q3") { h1 = "What do you hope for?"; }
  else if(question == "q4") { h1 = "What do you miss?"; }
  else if(question == "q5") { h1 = "What made you smile today?"; }
  else { h1 = "Who do you appreciate?"; }

  let d = [
    "M70.1,-15.7C78.4,2.9,64.2,35.8,39.8,53.1C15.5,70.4,-19,72.1,-42.9,55.6C-66.8,39,-80,4.4,-71.1,-15C-62.2,-34.4,-31.1,-38.4,-0.1,-38.4C30.9,-38.4,61.8,-34.2,70.1,-15.7Z",
    "M58.4,-57.2C73.6,-43.3,82.4,-21.6,82.4,0C82.4,21.7,73.7,43.3,58.5,55.7C43.3,68,21.7,71.1,4.5,66.6C-12.6,62,-25.2,49.9,-39.3,37.5C-53.4,25.2,-69,12.6,-71.5,-2.5C-74,-17.6,-63.4,-35.1,-49.2,-49.1C-35.1,-63.1,-17.6,-73.5,2,-75.5C21.6,-77.5,43.3,-71.2,58.4,-57.2Z",
    "M63.5,-22.5C70.3,0.4,55.6,28.3,32.1,45.7C8.7,63.2,-23.6,70,-44.4,56.1C-65.2,42.1,-74.5,7.4,-65.2,-18.8C-55.9,-45,-28,-62.8,0.2,-62.9C28.3,-62.9,56.6,-45.3,63.5,-22.5Z",
    "M61.4,-33.1C75.1,-11.6,78.8,18,66.9,33.2C55,48.5,27.5,49.3,5.9,45.9C-15.6,42.5,-31.3,34.8,-42.8,19.8C-54.3,4.8,-61.7,-17.5,-53.9,-35.6C-46,-53.6,-23,-67.4,0.4,-67.6C23.8,-67.8,47.6,-54.5,61.4,-33.1Z",
    "M66.6,-34.1C79.5,-16.1,78.5,14.3,65.1,29.7C51.7,45,25.8,45.3,2.4,43.9C-21,42.5,-42.1,39.5,-54.5,24.7C-66.9,9.9,-70.8,-16.6,-60.3,-33.2C-49.7,-49.8,-24.9,-56.5,1,-57C26.8,-57.6,53.7,-52,66.6,-34.1Z",
    "M55.8,-23.4C67.4,-12.3,68.2,13.8,57.1,31.6C46.1,49.4,23,58.8,1.2,58.1C-20.6,57.4,-41.1,46.5,-46.8,31.9C-52.5,17.2,-43.2,-1.2,-32.9,-11.6C-22.7,-22,-11.3,-24.4,5.4,-27.5C22.2,-30.6,44.3,-34.5,55.8,-23.4Z",
    "M48.3,-21.8C62.2,-3.8,72.8,22.2,64.2,38C55.6,53.8,27.8,59.5,5.7,56.2C-16.4,52.9,-32.7,40.6,-45.2,22.5C-57.8,4.5,-66.4,-19.4,-58.2,-34.2C-50,-48.9,-25,-54.4,-3.9,-52.2C17.2,-49.9,34.4,-39.9,48.3,-21.8Z",
    "M57.6,-31.8C68.3,-14.7,66.3,11.2,54.6,28.1C42.9,45,21.4,52.9,-1.9,54C-25.3,55.1,-50.6,49.5,-55.7,36.4C-60.7,23.4,-45.5,2.9,-32.9,-15.3C-20.2,-33.5,-10.1,-49.6,6.7,-53.4C23.4,-57.2,46.9,-48.9,57.6,-31.8Z"
  ];

  let main = $('main');
  let nav = $('nav');
  let subs = $('.blob-sub');
  let header = $('header');

  nav.append(
    '<h1>' + h1 + '</h1>'
  );

  // header.toggle('.sticky');

  if(question == "q2") {
    main.append(
      '<iframe src="https://open.spotify.com/embed/playlist/54cUSkHbKcdUB4tGD6Biyp" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'

    )
  }

  answers[0].map(answer => {
    let r = Math.floor(Math.random() * Math.floor(8));
    console.log(r);
    subs.last().append(
      '<div class="svg-content">' +
      '<div class="shape1 flip">' +
        '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
          '<path fill="#FFFFFF" d='+ d[r] +' transform="translate(100 100)" />' +
        '</svg>' +
      '</div>' +
      '<div class="blob-content">' +
        '<p>'+ answer +'</p>' +
      '</div>' +
    '</div>'
    );
  });
  const form = document.querySelector('.forms');
  form.classList.toggle('hide');
};

// create new answer
const createSubmission = (answer) => {
  axios.post('http://localhost:5000/answers', answer)
      .then(response => {
          const addedSubmission = response.data;
          // append to DOM
          appendToDOM([addedSubmission], answer.question);
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
