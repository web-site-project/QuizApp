const app = document.querySelector('.app'),
      question_index = document.querySelector(".question-index"),
      timer = document.querySelector(".timer"),
      question  = document.querySelector(".questions"),
      btn   = document.querySelectorAll(".btn"),
      start_btn = document.querySelector(".start_btn"),
      finish_btn = document.querySelector(".finish_btn");

let variables = {
    questionIndex : 0,
    score : 0,
    right_answer :"",
    times : 90,
    format_time : '',
    questions : [],
}

function get_questions(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let jsob = JSON.parse(xhttp.responseText);
            show_question(jsob);
        } 
    }
    xhttp.open("GET" , "questionFile.json" , true);
    xhttp.send();
}
start_btn.onclick = () => {
    // to hidden alert section
    start_btn.parentElement.classList.add("hidden");
    // to show questions bar
    app.classList.remove('hidden');
    timer_Function();
    get_questions()
}

let show_question = (data) => {


    // if question array is empty will take question from json file
    if(variables.questions.length == 0){
        variables.questions = [...data];
    }

    question.textContent = variables.questions[variables.questionIndex]['title'];
    
    btn.forEach((btnTag,btnIndex) => {
        // this line to show answers in html
        btnTag.textContent = variables.questions[variables.questionIndex][`answer_${btnIndex+1}`];

        btnTag.setAttribute("onclick" , "checkAnswer(event)");
    
    });



    question_index.textContent = `${variables.questionIndex + 1}/${variables.questions.length}`

    game_finish();
    
}

let checkAnswer = (event) =>{
    let e = event.target.innerHTML;

    if(e == variables.questions[variables.questionIndex]['right_answer']){
        variables.score++;
    }

    variables.questionIndex++;
    show_question(variables.questions);
}

let timer_Function = ()=>{

    let minute = Math.floor(variables.times / 60);
    let second = Math.floor(variables.times % 60);

    timer.innerHTML = `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`

    setInterval(() => {
        variables.times--;
        let minute = Math.floor(variables.times / 60);
        let second = Math.floor(variables.times % 60);
        variables.format_time = `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`
        timer.innerHTML = variables.format_time
    },1000);
}

let game_finish = () =>{
    if(variables.questionIndex + 1 == variables.questions.length){
        finish_btn.classList.remove("hidden");
    }
}

// button to finish game
finish_btn.firstElementChild.addEventListener('click' , ()=>{
        alert(`your sccore is ${variables.score}`);
        window.location.reload();
})
