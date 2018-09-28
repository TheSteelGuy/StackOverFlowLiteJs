

var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let load = document.getElementById("loader");
    let loader = `<div class="container">
    <div class="c-three-dots-loader"></div>
    </div>`
    load.innerHTML = loader;
    let details = JSON.stringify({
        "email": email,
        "password": password
    })
    fetch('https://stackoverflowlitev2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: details
    }
    )
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 401 || http_code == 403) {
                load.innerHTML = "Sign in Details"
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';

            }
            if (data.message == 'You have succesfully logged in') {
                token = data.auth_token
                window.localStorage.setItem('auth_token', token)
                window.location = 'questions.html'
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
            }
        })
        .catch((error) => {
            console.log(error)
        })
});
