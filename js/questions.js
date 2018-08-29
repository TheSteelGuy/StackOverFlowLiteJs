const fetchQuestions = () => {
    fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'GET',
        mode: "cors",
        headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer '+ window.localStorage.getItem('auth_token')
       },
    })
        .then((req) => {
            http_code = req.status
            return req.json()
        })
        .then((data) => {
            if (http_code == 200) {
                let h4 = document.createElement('h4');
                let p = document.createElement('p');
                let title = document.createTextNode(data.questions[0].title);
                let body = document.createTextNode(data.questions[0].body);
                h4.appendChild(title)
                p.appendChild(body)
                let div = document.getElementById('quest')
                let div1 = document.getElementById('ans')
                div.appendChild(h4)
                div1.appendChild(body)
                
        
            } else {
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.backgroundColor = 'sienna';
                document.getElementById('error').style.padding = '17px';
                document.getElementById('error').style.color = 'white';

            }
        })
        .catch((error) => {
            let data = error
            console.log(data)
        })
  }
  