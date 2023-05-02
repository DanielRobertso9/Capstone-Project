let emailInput = document.querySelector("#email");
let signUpBtn = document.querySelector("#sign-up");
let signUpForm = document.querySelector(".email-sign-up");
let footer = document.querySelector("footer");
let mesa = document.querySelector("button");
let trailList = document.querySelector("#trail-list");
let loginForm = document.querySelector("#login-container");
let signupForm = document.querySelector("#signup-container")
let logInBtn = document.querySelector("#log-in");
let username = document.querySelector("#username-input");
let password = document.querySelector("#password-input");
let loginbtn = document.querySelector("#log-in-btn");
let signUpBtnTop = document.querySelector("#register");
let profileBtn = document.querySelector("#profile");
let logOutBtn = document.querySelector("#log-out")
let meetsBtn = document.querySelector("#meets")
let trailIcons = document.querySelector(".trail-icons")
let signupBtn2 = document.querySelector("#sign-up-btn")
let username2 = document.querySelector("#username-input2")
let password2 = document.querySelector("#password-input2")
let firstName = document.querySelector("#first-name-input")
let lastName = document.querySelector("#last-name-input")
let vehicle = document.querySelector("#vehicle-input")
let photoURL = document.querySelector("#photo-input")
let slideIndex = [1];
let slideId = ["slide0"];

let userKey = 0

// EMAIL SUBMISSION FUCTIONS
function emailSubmit() {
  var confirmtionMsg = document.createElement("p");
  confirmtionMsg.textContent =
    "Thank You, " + emailInput.value + " for signing up.";
  signUpForm.remove();
  footer.appendChild(confirmtionMsg);
}

signUpBtn.addEventListener("click", emailSubmit);

// FUNCTIONS TO RETRIEVE TRAILS
function getTrails() {
  trailList.innerHTML = "";

  axios.get(`/trails/`).then((res) => {
    res.data.forEach((elem) => {
      let trailCard = `
          <div class="trails-container">
          <div class="slideshow-container" id="sliedshow${elem.trail_key}">
            <a class="prev" onclick="plusSlides(-1, ${elem.trail_key})">&#10094;</a>
            <a class="next" onclick="plusSlides(1, ${elem.trail_key})">&#10095;</a>
          </div>
         <h3> ${elem.trail_name} </h3>
          <p> ${elem.trail_location} </p>
          <p> Length: ${elem.trail_length} mi - Est. ${elem.trail_est_time}</p>
          <p> Difficulty: ${elem.trail_difficulty} </p>
          <div class="trail-icons">
          <span class="favorite-star" onclick="favoriteTrail(${elem.trail_key})" style='font-size:25px;'>&#11088;</span>
          <span class="complete-icon" onclick="completeTrail(${elem.trail_key})" style='font-size:25px;'>	&#10004;</span>
          </div>
        </div>`;

      trailList.innerHTML += trailCard;
      slideIndex.push(1);
      slideId.push(`slide${elem.trail_key}`);
    });
  });
}

function getTrailPics() {
  axios
    .get(`/pictures/`)

    .then((res) => {
      res.data.forEach((elem) => {
        let trailSlide = document.querySelector(`#sliedshow${elem.trail_key}`);

        let slideShow = `
      <div class="slide${elem.trail_key}">
        <img src="${elem.pic_url}" class="trail-img" alt="img${elem.picture_key}">
      </div>`;

        trailSlide.innerHTML += slideShow;
      });
    });
}

getTrails();
getTrailPics();

// FUNCTIONS FOR SLIDESHOW
function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function runSlides(arr) {
  for (i = 1; i < arr.length; i++) {
    showSlides(1, i);
  }
}

setTimeout(runSlides, 1000, slideIndex);

// LOGIN PAGE FUNCTIONS

function getUserKey () {
  axios.get(`/key`)
  .then((res) => {
    userKey = res.data[0]
    loggedIn()
  }).catch((err) => console.log(err));
}

function updatedUserKey (key) {
  axios.put(`/key`, key)
  .then((res) => {console.log("updated")
  getUserKey ()
  })
}

function loggedIn() {
  if (userKey > 0) {
    logInBtn.style.display = "none";
    signUpBtnTop.style.display = "none";
    logOutBtn.style.display = "block";
    profileBtn.style.display = "block";
    loginForm.style.display = "none";
    meetsBtn.style.display ="block";
  } else if (userKey <= 0) {
    logInBtn.style.display = "block";
    signUpBtnTop.style.display = "block";
    logOutBtn.style.display = "none";
    profileBtn.style.display = "none";
    meetsBtn.style.display ="none";
  }
}

function openLoginMenu() {
  loginForm.style.display = "flex";
}

function openSignupMenu() {
  signupForm.style.display = "flex";
}

function closeSignupMenu() {
  signupForm.style.display = "none";
}

function closeLoginMenu() {
  loginForm.style.display = "none";
}



function logIn() {
  if (username.value < 1) {
    alert("You must enter a username");
    return;
  }

  if (password.value < 1) {
    alert("You must enter a password");
    return;
  }

  axios
    .get(`/login`)
    .then((res) => {
      res.data.find((elem) => {
        if (
          username.value === elem.username &&
          password.value === elem.user_password
        ) {
          userKey = elem.user_key;

          body = {
            key: userKey
          }
          updatedUserKey(body)
          loggedIn();
          return userKey;
        }
      });
    })
    .catch((err) => console.log(err));
}

function createUser () {
  let body = {
    user: username2.value,
    password: password2.value,
    first: firstName.value,
    last: lastName.value,
    vehicle: vehicle.value,
    photo: photoURL.value,
  };

  axios.post(`/user`, body)
  .then((elem) => {
    closeSignupMenu()
    openLoginMenu()
  })
}

const completeTrail = (id) => axios.post(`/completeTrail/${id}`).then(alert("Trail has been Completed"))
const favoriteTrail = (id) => axios.post(`/favoriteTrail/${id}`).then(alert("Trail has been added to favorites"))

getUserKey()

