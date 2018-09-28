var answerButton = document.getElementById('myAnswerButtonq')
const answerQuestion = (event) => {
    event.preventDefault();
    let load = document.getElementById("error");
    let loader = `<div class="container">
    <div class="c-three-dots-loader"></div>
    </div>`
    load.innerHTML = loader;
    let answer = document.getElementById("myAnswer").value;
    let details = JSON.stringify({
        "answer": answer
    });
    let questionId = window.localStorage.getItem('questionId')
    fetch('https://stackoverflowlitev2.herokuapp.com/api/v2/questions/'+questionId+'/answers', {
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
                document.getElementById('error').innerHTML = 'Thanks for contributing to our Platform'
                document.getElementsByClassName('alert')[0].style.backgroundColor = 'green';
                console.log(data)
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementsByClassName('alert')[0].style.backgroundColor = 'sienna';
            }
        })
        .catch((error) => {
            console.log(error)
        })
};

const createQuizElems = (data) => {
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    let title = document.createTextNode(data.record[0].title);
    let body = document.createTextNode(data.record[0].body);
    h4.appendChild(title)
    h4.setAttribute('id', 'h4' + data.record[0].question_id)
    p.appendChild(body)
    let div = document.getElementById('quest');
    div.insertBefore(h4, div.childNodes[0]);
    let a = document.createElement('a')
    let i = document.createElement('i')
    let date = document.createTextNode('Asked on ' + data.record[0].post_date)
    let space = document.createTextNode(' by ')
    let author = document.createTextNode(data.record[0].username)
    i.appendChild(space);
    i.appendChild(author);
    a.appendChild(i);
    a.appendChild(date);
    a.appendChild(i);
    div.insertBefore(p, div.childNodes[1]);
    div.insertBefore(a, div.childNodes[2]);
  }