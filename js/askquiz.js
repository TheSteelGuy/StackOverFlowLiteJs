//var URL = "http://127.0.0.1:5000/api/v2/"
var URL = "https://stackoverflowlite.herokuapp.com/api/v2/"
var question = document.getElementById("quiz_form");
const questionForm = (event) => {
    event.preventDefault();
    var title = document.getElementById("title").value;
    let body = document.getElementById('quizBody').value;
    let load = document.getElementById("error");
    let loader = `<div class="container">
    <div class="c-three-dots-loader"></div>
    </div>`
    load.innerHTML = loader;
    let details = JSON.stringify({
        "title": title,
        "body": body
    })
    fetch(URL + 'questions', {
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
                document.getElementById('error').innerHTML = data.message;
                document.getElementsByClassName('alert')[0].style.backgroundColor = 'green';
                $(document).ready(function(){
                    $('.alert').fadeOut(2000, () => {})
                    //let questionObj = JSON.parse(window.localStorage.getItem('all_questions'))
                    //questionObj.questions[questionObj.questions.length + 1] = data.record[0];
                    fetchQuestions()
                    document.getElementById("title").value = '';
                    document.getElementById('quizBody').value = '';
                });
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementsByClassName('alert')[0].style.backgroundColor = 'sienna';
                $(document).ready(function(){
                    $('.alert').fadeOut(2000, () => {})
                });
            }
        })
        .catch((error) => {
            let data = JSON.parse(error)
        })
  }

 
      
  