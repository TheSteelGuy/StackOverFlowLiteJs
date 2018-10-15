
var URL = "http://127.0.0.1:5000/api/v2/"
var answerButton = document.getElementById('myAnswerButtonq')
const answerQuestion = (event) => {
    event.preventDefault();
    let load = document.getElementById("error");
    let loader = `<div class="container">
    <div class="c-three-dots-loader"></div>
    </div>`
    //load.innerHTML = loader;
    let answer = document.getElementById("myAnswer").value;
    let details = JSON.stringify({
        "answer": answer
    });
    let questionId = window.localStorage.getItem('questionId')
    fetch(URL + 'questions/'+questionId+'/answers', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
        body: details
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 201) {
                let message = 'Thanks for contributing to our Platform';
                Message('green', message, 'Success!', 'answerAlert')
                $(document).ready(function(){
                    $('#success').fadeOut(3000, () => {fetchQuestion(questionId)})
                });

            } else {
                Message('#f44842', data.message, 'Warning!', 'answerAlert') 
                $(document).ready(function(){
                    $('#success').fadeOut(3000, () => {})
                });
            }
        })
        .catch((error) => {
            console.log(error)
        })
};

