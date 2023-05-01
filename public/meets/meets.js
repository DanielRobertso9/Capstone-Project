let meetList = document.querySelector("#meets2")
let trailSelect = document.querySelector('#trail-select')
let start = document.querySelector('#meet-start')
let end = document.querySelector('#meet-end')
let date = document.querySelector('#meet-date')
let time = document.querySelector('#meet-time')
let notes = document.querySelector('#meet-notes')
const createBtn = document.querySelector('#create-button')

userKey = 0 

function getMeets() {
    meetList.innerHTML = "";
  
    axios.get(`http://localhost:4545/meets/`).then((res) => {
      res.data.forEach((elem) => {
        let meetCard = `<div class="meet2">
        <h3 class="trail-name">${elem.trail_name}</h3>
        <div class="meet-detail2">
        <span class="favorite-star" onclick="favoriteMeet(${elem.meet_key})" style='font-size:30px;'>&#11088;</span>
          <div>
            <p>Start Location: ${elem.meet_location}</p>
            <p>End Location: ${elem.meet_end_location}</p>
          </div>
          <div>
            <p>Date: ${elem.meet_date}</p>
            <p>Start Time: ${elem.meet_time}</p>
          </div>
          <p id="notes">NOTES: ${elem.meet_notes}</p>
        </div>
      </div>`
  
  
        meetList.innerHTML += meetCard;
      });
    });
  }

  getMeets()


  function getTrails() {
    axios.get(`http://localhost:4545/trails/`).then((res) => {
      res.data.forEach((elem) => {
        const option = document.createElement('option')
        option.setAttribute('value', elem['trail_key'])
        option.textContent = elem.trail_name
        trailSelect.appendChild(option)
      });
    });
  }

  getTrails()

  function createMeet () {
    let body = {
        name: trailSelect.value,
        start: start.value,
        end: end.value,
        date: date.value,
        time: time.value,
        notes: notes.value,
    };

    axios.post(`http://localhost:4545/meets`, body)
        .then(() => {
            getMeets()
        })
  }

const favoriteMeet = (id) => axios.post(`http://localhost:4545/favoriteMeet/${id}`).then(alert("Meet has been added to favorites"))

