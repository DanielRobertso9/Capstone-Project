let meetList = document.querySelector("#meets");
let userProfile = document.querySelector("#user-container");
let favoriteList = document.querySelector("#favorites");
let completedList = document.querySelector("#completed");

function getFavoritedMeets() {
  meetList.innerHTML = "";

  axios.get(`/favoritedmeets/`).then((res) => {
    res.data.forEach((elem) => {
      let meetCard = `
            <div class="meet">
             <h3 class="trail-name">${elem.trail_name}</h3>
                <div class="meet-detail">
                <div>
                <p>Start: ${elem.meet_location}</p>
                <p>End: ${elem.meet_end_location}</p>
                </div>
                <div>
                <p>Date: ${elem.meet_date}</p>
                <p>Time:${elem.meet_time}</p>
                </div>
            </div>
            <p>${elem.meet_notes}</p>
            </div>`;

      meetList.innerHTML += meetCard;
    });
  });
}

function getFavorites() {
    favoriteList.innerHTML = "";
  
    axios.get(`/favorites/`).then((res) => {
      res.data.forEach((elem) => {
        let favoriteCard = `
        <div class="profile-list">
          <h4>${elem.trail_name}</h4>
          <p>${elem.trail_location}</p>
          <p>${elem.trail_difficulty}</p>
          <div class="icons">
          <span class="complete-icon" onclick="completeTrail(${elem.trail_key})">	&#10004;</span>
          <span class="delete-icon" onclick="deleteFavorite(${elem.favorites_key})">&#10008;</span>
          </div>
        </div>`;

        favoriteList.innerHTML += favoriteCard;
      });
    });
  }

  function getCompleted() {
    completedList.innerHTML = "";
  
    axios.get(`/completed/`).then((res) => {
      res.data.forEach((elem) => {
        let completedCard = `
        <div class="profile-list">
          <h4>${elem.trail_name}</h4>
          <p>${elem.trail_location}</p>
          <p>${elem.trail_difficulty}</p>
          <div class="icons">
            <span class="delete-icon" onclick="deleteCompleted(${elem.completed_key})">&#10008;</span>
          </div>
        </div>`;

        completedList.innerHTML += completedCard;
      });
    });
  }

  function getUserInfo() {
    userProfile.innerHTML = "";

    axios.get(`/userInfo/`).then((res) => {
        let results = res.data[0]
        let userInfo = `
        <img id="profile-pic" src="${results.user_photo_url}">
        <div id="user-info">
          <h4 class="user">${results.user_first_name} ${results.user_last_name}</h4>
          <p class="user"> ${results.username} </p>
          <p class="user">${results.user_vehicle}</p>
        `;

        userProfile.innerHTML += userInfo
    })
  }

  const completeTrail = (id) => axios.post(`http://localhost:4545/completeTrail/${id}`).then(alert("Trail has been Completed"), getCompleted())
  const deleteFavorite = (id) => axios.delete(`http://localhost:4545/favorite/${id}`).then(alert("Trail has been removed from Favorites"), getFavorites())
  const deleteCompleted = (id) => axios.delete(`http://localhost:4545/completed/${id}`).then(alert("Trail has been removed from Completed"), getCompleted())

  getCompleted()
  getFavorites()
  getUserInfo()
  getFavoritedMeets()
  

