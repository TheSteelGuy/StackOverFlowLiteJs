
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

//const UpdateQuestionsArray = (newAnswer) => {
//    let questionString = window.localStorage.getItem('question');
//    let question_object = JSON.parse(questionString);
//    let answerComments = [newAnswer,{'comments':[]}]
//    question_object.answers.push(answerComments)
//    window.localStorage.setItem('question', JSON.stringify(question_object));
//    $(document).ready(function(){
//        let answers_div = document.getElementById('answers');
//        console.log(answers_div)
//        document.getElementById('answer_no').innerHTML = ' ';
//        answers_div.innerHTML = ' ';
//    });
//    displayResult()
//}



//const createAnswer = (data) => {
//    let h4 = document.createElement('h4');
//    let p = document.createElement('p');
//    let title = document.createTextNode(data.record[0].title);
//    let body = document.createTextNode(data.record[0].body);
//    h4.appendChild(title)
//    h4.setAttribute('id', 'h4' + data.record[0].question_id)
//    p.appendChild(body)
//    let div = document.getElementById('quest');
//    div.insertBefore(h4, div.childNodes[0]);
//    let a = document.createElement('a')
//    let i = document.createElement('i')
//    let date = document.createTextNode('Asked on ' + data.record[0].post_date)
//    let space = document.createTextNode(' by ')
//    let author = document.createTextNode(data.record[0].username)
//    i.appendChild(space);
//    i.appendChild(author);
//    a.appendChild(i);
//    a.appendChild(date);
//    a.appendChild(i);
//    div.insertBefore(p, div.childNodes[1]);
//    div.insertBefore(a, div.childNodes[2]);
//  }
//