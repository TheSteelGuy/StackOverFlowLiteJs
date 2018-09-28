const logOut = (event) => {
  event.preventDefault();
  fetch('https://stackoverflowlitev2.herokuapp.com/api/v2/auth/logout', {
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
            console.log(data.message)
            window.location = 'index.html';
          } else {
              document.getElementById('error').innerHTML = data.message
              document.getElementById('error').style.backgroundColor = 'sienna';
              document.getElementById('error').style.padding = '17px';
              document.getElementById('error').style.color = 'white';
              window.location = 'index.html'
          }
      })
      .catch((error) => {
          let data = error
          console.log(data)
      })
}
