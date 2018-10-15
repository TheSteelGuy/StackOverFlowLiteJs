var URL = "http://127.0.0.1:5000/api/v2/"

const createQuestions = (data) => {
    let elements = '';
    data.questions.forEach(question => {
        elements += createQestionAnswerTemplate(question.question_id,question.question_title,question.question,question.asked_by,question.asked_on)
        this.quest.innerHTML = elements;
    });
    let head_elements = this.quest.querySelectorAll(".questionClass");
    let viewed = 0;
    head_elements.forEach(element=>{
        element.addEventListener("click", ()=>{
            viewed += 1
            window.localStorage.setItem('view', viewed);
            fetchQuestion(element.getAttribute("question-id"));
        })
    })
}



const fetchQuestions = () => {
    fetch(URL  + "questions", {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                createQuestions(data)

            } else {
                document.getElementById('questionAlert').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'red';
            }
        })
        .catch((error) => {
            console.log(error)
        })
}



function fetchQuestion(question_id) {
    window.localStorage.setItem('questionId',question_id)
    fetch(URL + "questions/" + question_id, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                window.location = 'answer.html'
                window.localStorage.setItem('question', JSON.stringify(data));
            } else {
                Message(data, 'red', 'answerAlert')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


const commentOnAnswer = (questionId, answerId, commentBox, commentButton) => {
    document.getElementById(commentBox).style.display = 'block';
    document.getElementById(commentButton).style.display = 'block';
    let comment = document.getElementById(commentButton)
    comment.onclick = () => {
        let commentText = document.getElementById(commentBox).value;
        if (commentText.length < 1) {
            Message('#f44842', 'Comment Cannot be empty', 'Warning', 'alert' + answerId) 
            $(document).ready(function(){
                $('#success').fadeOut(3000, () => {})
            });

        }else {
            let commentJson = JSON.stringify({ 'comment': commentText });
            fetch(URL +  "questions/" + questionId + "/answers/" + answerId + "/comments", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')},
                body: commentJson
            })
                .then((req) => {
                    http_code = req.status;
                    return req.json();
                })
                .then((data) => {
                    if (http_code == 201) {
                        comment.style.display = 'none';
                        document.getElementById(commentBox).style.display = 'none';
                        fetchQuestion(questionId)
                        Message('green', data.message, 'Success', 'alert' + answerId) 
                        $(document).ready(function(){
                            $('#success').fadeOut(3000, () => {})
                        });
                        
                    } else {
                        Message('#f44842', data.message, 'Warning', 'alert' + answerId) 
                        $(document).ready(function(){
                            $('#success').fadeOut(3000, () => {})
                        });
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        };
    };

};




const upVoteAnswer = (questionId, answerId) => {
    fetch(URL + "questions/" + questionId + "/answers/" + answerId + "/upvote", {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        }
    })
        .then((req) => {
            http_code = req.status;
            return req.json();
        })
        .then((data) => {
            if (http_code == 409) {
                Message('#f44842', 'Action cannot be completed', 'Warning', 'alert' + answerId) 
                $('#success').fadeOut(3000, () => {})
            }
            if (http_code == 201) {
                fetchQuestion(questionId)
            }
            if (http_code == 401){
                Message('#f44842', 'Please login or signup first', 'Warning', 'alert' + answerId) 
                $('#success').fadeOut(3000, () => {})

            }})     
        
}

const downVoteAnswer = (questionId, answerId) => {
    fetch(URL + "questions/" + questionId + "/answers/" + answerId + "/upvote", {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        }
    })
        .then((req) => {
            http_code = req.status;
            return req.json();
        })
        .then((data) => {
            if (http_code == 200) {
                fetchQuestion(questionId)
            }
            if(data.message == 'You cant vote your answer!'){
                Message('#f44842', data.message, 'Warning', 'alert' + answerId) 
                $('#success').fadeOut(3000, () => {})
            }
            if (http_code == 401){
                Message('#f44842', 'Please login or signup first', 'Warning', 'alert' + answerId) 
                $('#success').fadeOut(3000, () => {})
            
            }
        })
}


const userQuestions = () => {
    fetch(URL + "user/questions/", {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                document.getElementById('countAnswers').innerHTML = innerHTML = 'My Answers';
                document.getElementById('countQuestions').innerHTML = 'Recent Questions';
                document.getElementById('email').innerHTML = 'Email: ' + data.questions[0].email;
                document.getElementById('totalAnswers').innerHTML = 'Total Answers' + ' | ' + data.my_answers.length + '|';
                document.getElementById('totalQuestions').innerHTML = 'Total Questions' + ' | ' + data.questions.length + '|';
                document.getElementById('username').innerHTML = 'Username: ' + data.questions[0].asked_by;
                let elements = ''
                data.questions.forEach(question => {
                    elements += profileTemplate(question.question_title, question.question_id, 'Remove', 'delete');
                    $(document).ready(function(){
                        document.getElementById('header' + question.question_id).addEventListener('click',() =>{
                            fetchQuestion(question.question_id)
                        });
                        document.getElementById('anchor' + question.question_id).addEventListener('click',() =>{
                        Confirm('Delete question','Are you sure want to delete this question?', 'Delete', 'Cancel', question.question_id)
                        });
                    });
                }); 
                document.getElementById('userQuestions').innerHTML=elements
                createAnswerElems(data);
                createMostAnsweredElems(data)
                window.localStorage.setItem('questionId', data.questions.question_id);

            }
            else {
                document.getElementById('countQuestions').innerHTML = 'My Questions';
                document.getElementById('countAnswers').innerHTML = 'My Answers';
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


const acceptAnswer = (questionId, answerId) => {
    let action = JSON.stringify({'action' : 'accept'});
    fetch(URL + "questions/" + questionId + '/answers/' + answerId, {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
        body : action
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (data.message == 'Succefully, accepted, this answer as preffered to your question') {
                Message('green', data.message, 'Succes!', 'alert' + answerId) 
                $(document).ready(function(){
                    $('#success').fadeOut(3000, () => {location.reload()})
                });
                fetchQuestion(questionId)
            } else {
                Message('#f44842', data.message, 'Warning', 'alert' + answerId) 
                $(document).ready(function(){
                    $('#success').fadeOut(3000, () => {location.reload()})
                });
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const createAnswerElems = (data) => {
    let elements = '';
    data.my_answers.forEach(answer => {
        elements += profileTemplate(answer.myanswer,answer.answer_id, 'Edit', 'edit');
        $(document).ready(function(){
            document.getElementById('header' + answer.answer_id).addEventListener('click', () => {
                fetchQuestion(answer.question_id)
            })
            document.getElementById('anchor' + answer.answer_id).addEventListener('click', () => {
            let modal = document.getElementById('myModal');
                modal.style.display = 'block';
                document.getElementById('answerContent').value = answer.myanswer;
                editAnswer(answer.question_id, answer.answer_id)
            })
        })
    });
    this.userAnswers.innerHTML = elements;
}

const createMostAnsweredElems = (data) => {
    let elements = '';
    data.most.forEach(question => {
        elements += profileTemplate(question.title, 'None', 'Answers: '+ question.answers_, 'most');
        $(document).ready(function(){
            document.getElementById('header' + question.question_id).addEventListener('click', () => {
                fetchQuestion(question.question_id)
            })
        })
    });
    this.mostAnswered.innerHTML = elements;
}

const editAnswer = (question_id, answer_id) => {
    var span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById('myModal');
    let updateButton = document.getElementById('editThis')
    console.log('qid= '+question_id + 'aid='+answer_id)
    updateButton.onclick = () => {
        updateAnswer(answer_id, question_id)
    }
    span.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

const updateAnswer = (answerId, questionId) => {
    let answerBody = document.getElementById('answerContent').value;
    let answerBodyJson = JSON.stringify({ 'answer' : answerBody,'action' : 'comment'})
    console.log(JSON.parse(answerBodyJson))
    console.log('qid'+questionId + 'AID '+ answerId)
    let URL = "http://127.0.0.1:5000/api/v2/"
    fetch(URL + "questions/" + questionId + '/answers/' + answerId, {
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
                document.getElementById('myModal').style.display = 'none';
                displayAlert('success', 'alert')
                console.log(document.getElementById('modal'))
            } else {
                document.getElementById('modal').style.display = 'block';
                document.getElementsByClassName('modalContent')[0].style.backgroundColor = 'red';
            }
        })
        .catch((error) => {
            console.log(error)
        })

}

const deleteQuestion = (question_id) => {
    fetch(URL + "questions/" + question_id, {
        method: 'DELETE',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token')
        },
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                location.reload()
            } else {
                Message(data, 'red')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


$(document).ready (function(){
    $("#success-alert").hide();
    $("#editThis").click(function showAlert() {
    $("#success-alert").fadeTo(3000, 500).slideUp(500, function(){
       $("#success-alert").slideUp(500);
        });   
    });
});



