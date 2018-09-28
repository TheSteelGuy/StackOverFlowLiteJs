var button = document.getElementById('editThis');
button.addEventListener('click', () => {

    updateAnswer()
    document.getElementById('myModal').style.display = 'none';
})
const updateAnswer = () => {
    let questionId = window.localStorage.getItem('questionId');
    let answerId = window.localStorage.getItem('answerId');
    let answerBody = document.getElementById('answerContent').value;
    let answerBodyJson = JSON.stringify({ 'answer' : answerBody,'action' : 'comment'})
    console.log(JSON.parse(answerBodyJson))
    fetch("https://stackoverflowlitev2.herokuapp.com//api/v2/questions/" + questionId + '/answers/' + answerId, {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
        body: answerBodyJson
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                let answerElem = document.getElementById('h4' + answerId);
                answerElem.innerHTML = data.update.description;
                alert(data.message);
            } else {
                alert(data.message)
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';
                //window.location = 'index.html'
            }
        })
        .catch((error) => {
            console.log(error)
        })
}
