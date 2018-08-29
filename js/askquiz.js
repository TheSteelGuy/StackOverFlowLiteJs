
var question = document.getElementById("quiz_form");
var title = document.getElementById("title").value;
let body = document.getElementById('quizBody').value;
const questionForm = (event) => {
    event.preventDefault();
    console.log(title)
    let details = JSON.stringify({
        "title": title,
        "body": body
    })
    fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer '+ window.localStorage.getItem('auth_token')
       },
        body: details
    }
    )
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 201) {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'green';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
            }
        })
        .catch((error) => {
            let data = JSON.parse(error)
            console.log(data)
        })
  }


      
  