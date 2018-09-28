const fetchQuestions = () => {
    fetch('https://stackoverflowlitev2.herokuapp.com/api/v2/questions', {
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
                for (let item in data.questions) {
                    let h4 = document.createElement('h4');
                    let p = document.createElement('p');
                    let title = document.createTextNode(data.questions[item].question_title);
                    let body = document.createTextNode(data.questions[item].question);
                    h4.appendChild(title)
                    h4.setAttribute('id', 'h4' + data.questions[item].question_id)
                    p.appendChild(body)
                    let div = document.getElementById('quest')
                    div.appendChild(h4)
                    div.appendChild(p)
                    let a = document.createElement('a')
                    let i = document.createElement('i')
                    let date = document.createTextNode('Asked on ' + data.questions[item].asked_on)
                    let space = document.createTextNode(' by ')
                    let author = document.createTextNode(data.questions[item].asked_by)
                    let id = document.createElement('input')
                    id.setAttribute('id', data.questions[item].question_id)
                    id.setAttribute('value', data.questions[item].question_id)
                    question_id = document.createTextNode(data.questions[item].question_id)
                    id.appendChild(question_id)
                    //id.setAttribute('id',data.questions[item].question_id)
                    div.appendChild(id)
                    //console.log(id)
                    i.appendChild(space)
                    i.appendChild(author)
                    a.appendChild(i)
                    a.appendChild(date)
                    a.appendChild(i)
                    div.appendChild(a)
                    let quiz_id = document.getElementById('h4' + data.questions[item].question_id)
                    h4.onclick = quiz_id.addEventListener("click", function quizEvent() {
                        fetchQuestion(data.questions[item].question_id)
                        window.localStorage.setItem('questionId', data.questions[item].question_id)
                        window.localStorage.setItem('accept', 0)
                    });
                    document.getElementsByClassName('loader')[0].style.display = 'none';
                }

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
    fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + question_id, {
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
                window.location = 'answer.html';
                window.localStorage.setItem('question', JSON.stringify(data));
                console.log(window.localStorage.getItem('accept'))
            } else {
                Message(data, 'red')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const displayResult = () => {
    let data = window.localStorage.getItem('question')
    let response = JSON.parse(data)
    console.log(response.answers)
    let answers_array = response.answers
    let answers_div = document.getElementById('answers')
    document.getElementById('quest').innerHTML = response.question[0].question_title;
    document.getElementById('quest_body').innerHTML = response.question[0].question;
    let answer_no = document.createTextNode(response.answers.length + ' Answers')
    let hr = document.createElement('hr')
    document.getElementById('answer_no').appendChild(answer_no);
    document.getElementById('answer_no').appendChild(hr)
    for (let answer in answers_array) {
        let p = document.createElement('p');
        console.log(response.answers[answer][1].comments)
        let description = document.createTextNode(response.answers[answer][0].description);
        p.appendChild(description)
        answers_div.appendChild(p)
        let a = document.createElement('a');
        let commentA = document.createElement('a');
        commentA.setAttribute('class', 'comment')
        commentA.setAttribute('id', 'comment' + response.answers[answer][0].answer_id);
        let commentDiv = document.createElement('div');
        commentDiv.style.backgroundColor = 'silver';
        commentDiv.style.color = 'white';
        let commentAuthor = document.createElement('i');
        let upvoteA = document.createElement('a');
        let upvotes = document.createElement('a');
        upvotes.setAttribute('id', 'upvotes' + response.answers[answer][0].answer_id);
        upvoteA.setAttribute('id', 'upvote' + response.answers[answer][0].answer_id);
        let downvoteA = document.createElement('a');
        let downvotes = document.createElement('a')
        if (response.answers[answer].votes >= 1) {
            upvotes.innerHTML = response.answers[answer][0].votes;
            downvotes.style.display = 'none';
        } else {
            downvotes.innerHTML = response.answers[answer][0].votes;
        }

        downvoteA.setAttribute('id', 'downvote' + response.answers[answer][0].answer_id);
        downvotes.setAttribute('id', 'downvotes' + response.answers[answer][0].answer_id);
        let i = document.createElement('i');
        let comment_box = document.createElement('input')
        comment_box.setAttribute('type', 'text')
        comment_box.setAttribute('id', 'commentBox' + response.answers[answer][0].answer_id);
        let comment_button = document.createElement('input');
        comment_button.setAttribute('type', 'submit');
        comment_button.setAttribute('value', 'Comment on this answer');
        comment_button.setAttribute('id', 'commentButton' + response.answers[answer][0].answer_id);
        let author_name = document.createTextNode(response.answers[answer][0].answerd_by + ' ')
        let author = document.createTextNode('Answered by ');
        let comment = document.createTextNode(' Comment ');
        let upvote = document.createTextNode('| Upvote')
        let downvote = document.createTextNode('| Downvote')
        let space = document.createTextNode(' by ');
        //accept
        let accept = document.createElement('a');
        //comments 
        let commentsDisplay = document.createElement('div');
        commentsDisplay.setAttribute('id', 'comDisplay' + response.answers[answer][0].answer_id);
        commentsDisplay.setAttribute('class', 'comDisplay');
        let commentsHeader = document.createElement('h6');
        commentsHeader.setAttribute('id', 'comments')
        commentsDisplay.appendChild(commentsHeader);
        let commentArray = response.answers[answer][1].comments
        commentsHeader.innerHTML = 'Comments ' + commentArray.length;
        for (let comment in commentArray){
            let commentspara = document.createElement('p');
            commentspara.setAttribute('id', 'commentpara');
            let commentby = document.createElement('h6');
            commentby.setAttribute('id', 'commentby');
            commentby.innerHTML = 'Comment by ' +  commentArray[comment].commented_by
            commentspara.innerHTML = commentArray[comment].comment
            commentsDisplay.appendChild(commentspara); 
            commentsDisplay.appendChild(commentby)
        }
        let acceptTextNode = document.createTextNode(' | Accept');
        accept.setAttribute('id', 'accept' + response.answers[answer][0].answer_id);
        accept.setAttribute('class', 'accept');
        accept.appendChild(acceptTextNode);
        a.appendChild(author)
        i.appendChild(author_name)
        a.appendChild(i);
        upvoteA.appendChild(upvote);
        downvoteA.appendChild(downvote);
        commentA.appendChild(comment);
        answers_div.appendChild(a);
        answers_div.appendChild(upvoteA);
        answers_div.appendChild(upvotes);
        answers_div.appendChild(downvoteA);
        answers_div.appendChild(downvotes);
        answers_div.appendChild(commentA);
        answers_div.appendChild(accept);
        answers_div.appendChild(commentsDisplay)
        answers_div.appendChild(comment_box)
        answers_div.appendChild(comment_button)
        let selectUpvote = document.getElementById('upvote' + response.answers[answer][0].answer_id)
        upvoteA.onclick = selectUpvote.addEventListener("click", () => {
            let questionId = response.answers[answer][0].question_id;
            let answerId = response.answers[answer][0].answer_id;
            let elemId = 'upvotes' + response.answers[answer][0].answer_id;
            upVoteAnswer(questionId, answerId, elemId);
        });
        let selectDownvote = document.getElementById('downvote' + response.answers[answer][0].answer_id)
        downvoteA.onclick = selectDownvote.addEventListener("click", () => {
            let questionId = response.answers[answer][0].question_id;
            let answerId = response.answers[answer][0].answer_id;
            let elemId = 'downvotes' + response.answers[answer][0].answer_id;
            downVoteAnswer(questionId, answerId, elemId);
        });
        let selectComment = document.getElementById('comment' + response.answers[answer][0].answer_id)
        commentA.onclick = selectComment.addEventListener("click", () => {
            let answerId = response.answers[answer][0].answer_id;
            let questionId = response.answers[answer][0].question_id;
            let commentBox = 'commentBox' + response.answers[answer][0].answer_id;
            let commentButton = 'commentButton' + response.answers[answer][0].answer_id
            commentOnAnswer(questionId, answerId, commentBox, commentButton);
        });
        let selectAccept = document.getElementById('accept' + response.answers[answer][0].answer_id)
        accept.onclick = selectAccept.addEventListener("click", () => {
            let answerId = response.answers[answer][0].answer_id;
            let questionId = response.answers[answer][0].question_id;
            let elemId = 'accept' + response.answers[answer][0].answer_id;
            acceptAnswer(questionId, answerId, elemId);
        });
    };
}


const commentOnAnswer = (questionId, answerId, commentBox, commentButton) => {
    console.log(questionId+'=quid' + 'aid='+answerId)
    document.getElementById(commentBox).style.display = 'block';
    document.getElementById(commentButton).style.display = 'block';
    let comment = document.getElementById(commentButton)
    comment.onclick = () => {
        let commentText = document.getElementById(commentBox).value;
        if (commentText.length < 5) {
            let errorText = document.getElementById(commentBox)
            errorText.value = 'Provide comment description';
            errorText.style.color = 'red';
            return false

        }
        if (commentText === 'Provide comment description') {
            let errorText = document.getElementById(commentBox)
            errorText.value = 'Provide comment description';
            errorText.style.color = 'red'
            return false
        } else {
            let commentJson = JSON.stringify({ 'comment': commentText });
            fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + questionId + "/answers/" + answerId + "/comments", {
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
                    let parentDiv = document.getElementById('comDisplay' + answerId);
                    if (http_code == 201) {
                        //console.log(data)
                        comment.style.display = 'none';
                        document.getElementById(commentBox).style.display = 'none';
                        let commentAuthor = document.createElement('h6');
                        let commentDescription = document.createElement('p');
                        commentDescription.setAttribute('id', 'commentpara');
                        commentAuthor.setAttribute('id', 'commentby');
                        commentAuthor.innerHTML = data.comment[0].username;
                        commentDescription.innerHTML = 'Comment by' + data.comment[0].comment ;
                        parentDiv.appendChild(commentDescription);
                        parentDiv.appendChild(commentAuthor);
                        Message(data, 'green')
                    } else {
                        Message(data, 'red')
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        };
    };

};

const Message = (data, color) => {
    let modal = document.getElementById('myModal');
    let modalContent = document.getElementById('modal-content');
    modal.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    document.getElementById('message').innerHTML = data.message;
    modalContent.style.backgroundColor = color;
    span.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


const createCommentElems = (answerId, username, comment) => {
    let parentDiv = document.getElementById('comDisplay' + answerId);
    let commentDiv = document.createElement('div');
    commentDiv.style.backgroundColor = 'silver';
    commentDiv.style.color = 'white';
    let commentAuthor = document.createElement('i');
    let commentTime = document.createElement('i');
    let commentDescription = document.createElement('h6');
    let commentBy = document.createTextNode('Commented by ' + username);
    let commentText = document.createElement('i');
    commentText.innerHTML = comment;
    commentDescription.appendChild(commentText);
    commentDiv.appendChild(commentDescription)
    parentDiv.appendChild(commentDiv)

    commentAuthor.appendChild(commentBy);
    commentDiv.appendChild(commentAuthor)
    parentDiv.appendChild(commentDiv)
}

const upVoteAnswer = (questionId, answerId, elemId) => {
    let upvote = document.getElementById('upvote' + answerId);
    fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + questionId + "/answers/" + answerId + "/upvote", {
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
                let votes = data.votes;
                let element = document.getElementById(elemId);
                //let upvotes = document.createTextNode(votes);
                element.innerHTML = votes;
            }else{
                Message(data, 'red')
            }
        })
}

const downVoteAnswer = (questionId, answerId, elemId) => {
    let upvote = document.getElementById('upvote' + answerId);
    fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + questionId + "/answers/" + answerId + "/downvote", {
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
                let votes = data.votes;
                let element = document.getElementById(elemId);
                //let upvotes = document.createTextNode(votes);
                element.innerHTML = votes;
            }else{
                Message(data, 'red')
            }
        })
}

const userQuestions = () => {
    fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/user/questions/", {
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
                let table = document.getElementById('userQuestions');
                let countAnswers = document.getElementById('countAnswers');
                let countQuestions = document.getElementById('countQuestions')
                countQuestions.innerHTML = 'MY Questions' + ' |' + data.questions.length + '|';
                countAnswers.innerHTML = innerHTML = 'My Answers' + ' |' + data.my_answers.length + '|';
                for (let question in data.questions) {
                    let tr = document.createElement('tr');
                    let th = document.createElement('th');
                    let thNode = document.createTextNode(data.questions[question].question_title);
                    let h4 = document.createElement('h4');
                    h4.addEventListener('click', () => {
                        window.localStorage.setItem('accept', 1)
                        let question_id = data.questions[question].question_id;
                        fetchQuestion(question_id)
                    })
                    th.appendChild(h4)
                    h4.appendChild(thNode);
                    tr.appendChild(th)
                    let answerElement = document.createElement('td');
                    let removeCell = document.createElement('td');
                    removeCell.setAttribute('id', 'removeCell' + data.questions[question].question_id)
                    let removeElement = document.createElement('a');
                    removeElement.setAttribute('class', 'delete')
                    removeElement.setAttribute('id', 'delete'+ data.questions[question].question_id);
                    removeElement.addEventListener('click', () => {
                        let question_id = data.questions[question].question_id;
                        deleteQuestion(question_id, tr)
                    })
                    let editCell = document.createElement('td');
                    let editElement = document.createElement('a');
                    editElement.addEventListener('click', () => {
                        let question_id = data.questions[question].question_id;
                        let questionTitle = data.questions[question].question_title;
                        let questionBody = data.questions[question].question_body;
                        editQuestion(question_id, questionTitle, questionBody)
                    })
                    editElement.setAttribute('id', 'edit' + data.questions[question].question_id);
                    editElement.setAttribute('class', 'edit');
                    let i = document.createElement('i');
                    let answerNode = document.createTextNode('  Answers ');
                    let remove = document.createTextNode('Remove');
                    let edit = document.createTextNode('Edit');
                    i.appendChild(answerNode);
                    answerElement.appendChild(i)
                    removeElement.appendChild(remove);
                    removeCell.appendChild(removeElement);
                    editElement.appendChild(edit);
                    editCell.appendChild(editElement);
                    tr.appendChild(answerElement);
                    tr.appendChild(removeCell);
                    tr.appendChild(editCell);
                    table.appendChild(tr);

                }
                createAnswerElems(data);
                window.localStorage.setItem('questionId', data.questions.question_id);

            }
            else {
                document.getElementById('countQuestions').innerHTML = 'My Questions |0|';
                document.getElementById('countAnswers').innerHTML = 'My Answers |0|';
                //alert(data.message)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const showAccept = () => {
    acceptElements = document.getElementsByClassName('accept');
    for (let elem in acceptElements) {
        document.getElementsByClassName('accept')[elem].style.display = 'inline';


    }

}

const acceptAnswer = (questionId, answerId, elemId) => {
    let button = document.getElementById(elemId);
    let action = JSON.stringify({'action' : 'accept'});
    fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + questionId + '/answers/' + answerId, {
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
                Message(data, 'green')
            } else {
                Message(data, 'red')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const createAnswerElems = (data) => {
    let table = document.getElementById('userAnswers')
    for (let answer in data.my_answers) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let answerNode = document.createTextNode(data.my_answers[answer].myanswer);
        let h4 = document.createElement('h4');
        h4.setAttribute('id', 'h4' + data.my_answers[answer].answer_id);
        h4.addEventListener('click', () => {
            question_id = data.my_answers[answer].question_id;
            fetchQuestion(question_id);
        })
        h4.appendChild(answerNode);
        td.appendChild(h4);
        tr.appendChild(td);
        let editCell = document.createElement('td');
        editElement = document.createElement('a');
        editElement.setAttribute('id', 'edit' + data.my_answers[answer].answer_id);
        editElement.setAttribute('class', 'edit');
        editElement.addEventListener('click', () => {
            let question_id = data.my_answers[answer].question_id;
            let answer_id = data.my_answers[answer].answer_id;
            let myAnswer = data.my_answers[answer].myanswer;
            editAnswer(question_id, answer_id, myAnswer)
        })
        let edit = document.createTextNode('Edit');
        editElement.appendChild(edit);
        editCell.appendChild(editElement)
        tr.appendChild(editCell)
        table.appendChild(tr);
    }
    console.log(data)
}

const editAnswer = (question_id, answer_id, myanswer) => {
    var modal = document.getElementById('myModal');
    var edit = document.getElementById("edit" + answer_id);
    var span = document.getElementsByClassName("close")[0];
    edit.onclick = () => {
        modal.style.display = "block";
        document.getElementById('answerContent').value = myanswer;
        document.getElementById('questionTitle').style.display = 'none';
        window.localStorage.setItem('questionId', question_id);
        window.localStorage.setItem('answerId', answer_id);

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

const editQuestion = (question_id, questionTitle, questionBody) => {
    var modal = document.getElementById('questionModal');
    var edit = document.getElementById("edit" + question_id);
    var span = document.getElementsByClassName("close")[0];
    edit.onclick = () => {
        modal.style.display = "block";
        document.getElementById('questionTitle').style.display = 'block';
        document.getElementById('answerContent').value = questionBody;
        document.getElementById('questionTitle').value = questionTitle;
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

const deleteQuestion = (question_id, tr) => {
    let action = confirm("Delete this question!");
    if (action == true) {
        fetch("https://stackoverflowlitev2.herokuapp.com/api/v2/questions/" + question_id, {
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
                    let table = document.getElementById('userQuestions')
                    table.removeChild(tr);
                } else {
                    Message(data, 'red')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

