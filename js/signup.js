
var URL = "http://127.0.0.1:5000/api/v2/"
var signupForm = document.getElementById("signupform");
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let username =  document.getElementById("username").value;
    let email = document.getElementById('email').value;
    let password = document.getElementById("pwd").value;
    let confirm_pwd = document.getElementById("cpwd").value;
    if (password === confirm_pwd){
        let load = document.getElementById("loader");
        let loader = `<div class="container">
        <div class="c-three-dots-loader"></div>
        </div>`
        load.innerHTML = loader;
        let details = JSON.stringify({
            "username":username,
            "email":email,
            "password":password,
            "confirm_pwd":confirm_pwd   
        })
        //https://stackoverflowlitev2.herokuapp.com
        fetch(URL + 'auth/signup', {
            method: 'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body:details
            }
        )
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code != 201){
                load.innerHTML = 'Sign up details'
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding='17px';
                document.getElementById('error').style.color = 'white';
            }else{
                window.location = 'login.html'
            }
        })

        .catch((error) => {
            let data = JSON.parse(error)
            console.log(data)
        })
               
    }else{
        document.getElementById('error').innerHTML = 'Password and confirm password fields must be the same'     
        document.getElementById('error').style.backgroundColor = 'sienna';
        document.getElementById('error').style.padding='17px';
        document.getElementById('error').style.color = 'white';
    }
        
});

