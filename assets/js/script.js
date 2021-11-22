// array containing quiz questions
var questions = [
  {
      title: "What does API stand for?:",
      choices: ["Artificial Programming Intelligence",
      "American Programming Interface",
      "Application Programming Interface",
      "None of the above"],
      answer: "Application Programming Interface"
  },
  {
      title: "What does HTML stand for?",
      choices: ["Hypertext Microsoft Language",
      "Hypertext Mark Up Language",
      "Hyper Transition Mark Up Language",
      "Hypertext Mailing Language"],
      answer: "Hypertext Mark Up Language"
  },
  {
      title: "What does CSS stand for?",
      choices: ["Coding Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"],
      answer: "Cascading Style Sheet"
  },
  {
      title: "What is a boolean?",
      choices: ["A variable",
      "A function",
      "A True or false data type.",
      "A & B"],
      answer: "A True or false data type."
  },
  {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
  },

];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = "Time: " + secondsLeft;

          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              allDone();
              currentTime.textContent = "Time's up!";
          }
      }, 1000);
  }
  render(questionIndex);
});

function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].title;
      var userChoices = questions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
     
      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
         
      } else {
          
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
      }

  }

  questionIndex++;

  if (questionIndex >= questions.length) {
      allDone();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  questionsDiv.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;

      questionsDiv.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

}