

var logout = document.getElementById("logout");
const logout = (event) => {
    fetch('http://127.0.0.1:5000/api/v2/auth/logout', {
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
            if (http_code == 403 || http_code == 401) {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
                window.location = 'index.html'
            }
            if (data.message == 'You have succesfully logged out') {
                token = data.auth_token
                window.localStorage.setItem('auth_token', "")
                window.location = 'index.html'
                
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
            }
        })
        .catch((error) => {
            let data = data.message
            console.log(data)
        })
}

