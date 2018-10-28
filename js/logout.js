//var URL = "http://127.0.0.1:5000/api/v2/"
var URL = "https://stackoverflowlitev2.herokuapp.com/api/v2/"
const logOut = (event) => {
  event.preventDefault();
  fetch(URL + 'auth/logout', {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json',
      'Authorization':'Bearer '+ window.localStorage.getItem('auth_token')
     },
  })
      .then((req) => {
          return req.json()
      })
      .then((data) => {
          if (data.message == 'You have successfuly logged out') {
              localStorage.removeItem('auth_token')
              window.location = 'index.html';
          } else {
              document.getElementById('error').innerHTML = data.message
              document.getElementById('error').style.backgroundColor = 'sienna';
              document.getElementById('error').style.padding = '17px';
              document.getElementById('error').style.color = 'white';
              localStorage.removeItem('auth_token')
              window.location = 'index.html'

          }
      })
      .catch((error) => {
      })
}
