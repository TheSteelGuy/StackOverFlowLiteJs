const Message = (color, message, status, element) => {
    let elements = `<div class="messageAlert" style="background-color:${color};">
                    <div class="alert alert-success" id="success">
                    <span class="close">&times;</span>
                    <a href="javascript:;" style="color:white;" class="btn btn-mini" ><strong>${status}! </strong>${message}</a>
                    </div>
                    </div>`
    document.getElementById(element).innerHTML = elements;
}

const createAnswersTemplate = (answer, author, commentsCount, answer_id, votes) => {
    let template =  `<div class="card">
                 <div class="container">
                 <p>${answer}</p>
                 <i id='right'style="padding-top:15px;paddin">${'Answered by '+ author}</i>
                 <span>
                 <a><i class="fa fa-thumbs-up" style="font-size:24px;" id="${'upvote' + answer_id}"></i>
                 <span id="${'vote' + answer_id}" style="padding-right:15px">${votes}</span>
                 <a><i class="fa fa-thumbs-down" style="font-size:24px;"id="${'downvote' + answer_id}"></i>
                 <a><i class="fa fa-check"style="font-size:24px;color:dodgerblue;"id="${'accept' + answer_id}"></i></a>
                 <i class="fa fa-comment" id="${'comment' + answer_id}"style="font-size:24px;color:grey; padding-right:15px; cursor:pointer;"></i><br>
                 <div id="${'alert'+ answer_id}"></div>
                 <input type="text" id="${'commentBox'+answer_id}" required placeholder="Enter comment">
                 <input type="submit" id="${'commentButton'+answer_id}" value="comment" style='width:80px;'>
                 </span>
                 <hr>
                 <p style="font-size:13px;"id='countComment'>${'Comments '+commentsCount}</p>
                 <div class="comDisplay" id="${'comDisplay' + answer_id}">
                 </div>
                 </div>
                 </div>
                 </div>`
    return template
 }


 const profileTemplate = (title, dataId, text, elemId) => {
    let template =    ` <tr id="${'tr' + dataId}">
                        <th><h4 id="${'header' + dataId}">${title}</h4></th>
                        <td><a class="${elemId}" id=${'anchor' + dataId}>${text}</a></td>
                        </tr>`
    return template
 }


 const createQestionAnswerTemplate = (question_id,title,body,creator, date) => {
    var template =    ` <div class="card">
                        <div class="container">
                        <h4 class='questionClass' question-id = '${question_id}'><b>${title}</b></h4>
                        <p>${body}</p> 
                        <a>Posted on <i> ${date}</i></a>
                        <a>Posted by<i> ${creator}</i></a>
                        <a id="countAnswer"></a>
                        <a id='view'></a>
                        </div>
                        </div>`
    return template
 }


const displayResult = () => {
    let data = window.localStorage.getItem('question')
    let response = JSON.parse(data)
    let answers_array = response.answers
    console.log('question',answers_array)
    let question_id = response.question[0].question_id
    let title = response.question[0].question_title
    let body = response.question[0].question
    let author = response.question[0].asked_by;
    document.getElementById('quest').innerHTML = createQestionAnswerTemplate(question_id,title,body,author, '42 Minutes ago')
    let elements = '';
    answers_array.forEach(answer => {
        let description = answer[0].description
        let author = answer[0].answerd_by;
        let countComment = answer[1].comments.length;  
        let questionId = answer[0].question_id;
        let answerId = answer[0].answer_id;    
        let votes = answer[2].votes; 
        let accepted = answer[0].accepted; 
        elements += createAnswersTemplate(description,author,countComment,answer[0].answer_id, votes,accepted);
        $(document).ready(function(){
            accepted? document.getElementById('accept' + answerId).style.color='green':false;
        })
        let commentTemplate = '';
        answer[1].comments.forEach(comment => {
            $(document).ready(function(){
                commentTemplate += `<p>${comment.comment}${' ~ '+comment.commented_by}</p>`
                document.getElementById('comDisplay' + answer[0].answer_id).innerHTML = commentTemplate;
            });
        });
        $(document).ready(function(){
            let Upvote = document.getElementById('upvote' + answerId)
            Upvote.addEventListener("click", () => {
                  upVoteAnswer(questionId, answerId);
            });
            let downvote = document.getElementById('downvote' + answerId)
            downvote.addEventListener("click", () => {
                    downVoteAnswer(questionId, answerId);
            });
            let commentElem = document.getElementById('comment' + answerId);
            commentElem.addEventListener("click", () => {
                let commentBox = 'commentBox' + answerId;
                let commentButton = 'commentButton' + answerId;
                commentOnAnswer(questionId, answerId, commentBox, commentButton);
            });
            let Accept = document.getElementById('accept' + answerId)
            Accept.addEventListener("click", () => {
                acceptAnswer(questionId, answerId); 
            });
        });
    });
    this.answers.innerHTML = elements;
    document.getElementById('countAnswer').innerHTML = 'Answers ' + response.answers.length;
    document.getElementById('view').innerHTML = 'Viewed: ' + localStorage.getItem('view') + ' times';
   
}


function Confirm(title, msg, $true, $false, question_id) { /*change*/
    var $content =  "<div class='dialog-ovelay'>" +
                    "<div class='dialog'><header>" +
                    " <h3> " + title + " </h3> " +
                    "<i class='fa fa-close'></i>" +
                    "</header>" +
                    "<div class='dialog-msg'>" +
                    " <p> " + msg + " </p> " +
                    "</div>" +
                    "<footer>" +
                    "<div class='controls'>" +
                    " <button class='button button-danger doAction'>" + $true + "</button> " +
                    " <button class='button button-success cancelAction'>" + $false + "</button> " +
                    "</div>" +
                    "</footer>" +
                    "</div>" +
                    "</div>";
     _id = question_id
     $('body').prepend($content);
     $('.doAction').click(function (_id) {
         deleteQuestion(question_id)
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
          $(this).remove();
        });
  });
$('.cancelAction, .fa-close').click(function () {
    $(this).parents('.dialog-ovelay').fadeOut(500, function () {
      $(this).remove();
    });
  });
  
}
