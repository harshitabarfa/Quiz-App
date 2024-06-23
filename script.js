let questions = [
  {
    number: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    number: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    number: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    number: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    number: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
];

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const optionList = document.querySelector(".option-list");
const timeLine = document.querySelector("header .time-line");
const timeText = document.querySelector(".timer .time-left-text");
const timeCount = document.querySelector(".timer .timer-seconds");

// if startQuiz button clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); //show informtion box
};

// if exitQuiz button clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); //hide information box
};

// if continueQuiz button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); //hide information box
  quizBox.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(15); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};

let timeValue = 15;
let queCount = 0;
let queNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

// if restartQuiz button clicked
restartQuiz.onclick = () => {
  quizBox.classList.add("activeQuiz"); //show quiz box
  resultBox.classList.remove("activeResult"); //hide result box
  timeValue = 15;
  queCount = 0;
  queNumber = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(queCount); //calling showQestions function
  queCounter(queNumber); //passing queNumber value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
  nextBtn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quitQuiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const nextBtn = document.querySelector("footer .next-btn");
const prevBtn = document.querySelector("footer .prev-btn");
const bottomQueCounter = document.querySelector("footer .total-questions");

// if NextQue button clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    //if question count is less than total question length
    queCount++; //increment the queCount value
    queNumber++; //increment the queNumber value
    showQuetions(queCount); //calling showQestions function
    queCounter(queNumber); //passing queNumber value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    nextBtn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

// getting questions and options from array
function showQuetions(index) {
  const queText = document.querySelector(".question-text");

  //creating a new span and div tag for question and option and passing the value using array index
  let queTag =
    "<span>" +
    questions[index].number +
    ". " +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";

  queText.innerHTML = queTag; //adding new span tag inside queTag
  optionList.innerHTML = optionTag; //adding new div tag inside optionTag

  const option = optionList.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correctAns = questions[queCount].answer; //getting correct answer from array
  const allOptions = optionList.children.length; //getting all option items

  if (userAns == correctAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        //if there is an option which is matched to an array answer
        optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  nextBtn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
  infoBox.classList.remove("activeInfo"); //hide info box
  quizBox.classList.remove("activeQuiz"); //hide quiz box
  resultBox.classList.add("activeResult"); //show result box
  const scoreText = resultBox.querySelector(".score-text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>And congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>And nice , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>And sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = optionList.children.length; //getting all option items
      let correcAns = questions[queCount].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      nextBtn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; //upgrading time value with 1
    timeLine.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottomQueCounter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
