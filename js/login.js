

var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let details = JSON.stringify({
        "email": email,
        "password": password
    })
    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
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
            if (http_code == 401 || http_code == 401) {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
            }
            if (data.message == 'You have succesfully logged in') {
                token = data.auth_token
                window.localStorage.setItem('auth_token', token)
                console.log(window.localStorage.getItem('auth_token'))
                window.location = 'questions.html'
                window.localStorage.setItem('auth_token',data.auth_token)
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
            }
        })
        .catch((error) => {
            let data = error.message
            console.log(data)
        })
});
