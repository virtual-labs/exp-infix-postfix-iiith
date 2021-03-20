/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
function buildQuiz() {
// we'll need a place to store the HTML output
const output = [];

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// we'll want to store the list of answer choices
const answers = [];

// and for each available answer...
for (letter in currentQuestion.answers) {
// ...add an HTML radio button
answers.push(
`<label>
<input type="radio" name="question${questionNumber}" value="${letter}">
${letter} :
${currentQuestion.answers[letter]}
</label>`
);
}

// add this question and its answers to the output
output.push(
`<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join("")} </div>`
);
});

// finally combine our output list into one string of HTML and put it on the page
quizContainer.innerHTML = output.join("");
}

function showResults() {
// gather answer containers from our quiz
const answerContainers = quizContainer.querySelectorAll(".answers");
answerContainers.forEach(e => e.style.color = "black");

// keep track of user's answers
let numCorrect = 0;

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// find selected answer
const answerContainer = answerContainers[questionNumber];
const selector = `input[name=question${questionNumber}]:checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// if answer is correct
if (userAnswer === currentQuestion.correctAnswer) {
// add to the number of correct answers
numCorrect++;

// color the answers green
//answerContainers[questionNumber].style.color = "lightgreen";
} else {
// if answer is wrong or blank
// color the answers red
answerContainers[questionNumber].style.color = "red";
}
});

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


const myQuestions = [{
question: "1. What does push operation on a stack do?", ///// Write the question inside double quotes
answers: {
a: "Adds an element to the bottom of the stack. ", ///// Write the option 1 inside double quotes
b: "Adds an element to the top of the stack.", ///// Write the option 2 inside double quotes
c: "Removes an element from the top of the stack. ", ///// Write the option 2 inside double quotes
d: "Teacher mugs up all students names. ", ///// Write the option 2 inside double quotes
},
correctAnswer: "b" ///// Write the correct option inside double quotes
},

{
question: "2. Situation: A teacher wants to remember the names of all students in the class. Which of the following best possible way to use the linked list in this situation? ",  ///// Write the question inside double quotes
answers: {
a: "Teacher mugs up all students names. ",                  ///// Write the option 1 inside double quotes
b: "Teacher asks her favorite student to mug up all others names and help her whenever needed. ",                  ///// Write the option 2 inside double quotes
c: "Teacher asks each student to remember the person sitting next to him/her and the teacher will only have to remember the first person's name. ", ///// Write the option 3 inside double quotes
d: " Teacher asks all students to mug every other student's name.", ///// Write the option 4 inside double quotes
},
correctAnswer: "c"                ///// Write the correct option inside double quotes
},

{
question: "3. Situation: A teacher wants to remember the names of all students in the class. In the aforementioned question, what are the pros and cons using linked list faced by the teacher? ",  ///// Write the question inside double quotes
answers: {
a: "It minimizes her effort.",                  ///// Write the option 1 inside double quotes
b: "To access a student's name it will take a lot of time. ",                  ///// Write the option 2 inside double quotes
c: "Both a and b", ///// Write the option 3 inside double quotes
d: " None of these ", ///// Write the option 4 inside double quotes
},
correctAnswer: "c"                ///// Write the correct option inside double quotes
},
{
question: "4. Which of the following best describes a stack?",  ///// Write the question inside double quotes
answers: {
a: "People standing at Starbucks.",                  ///// Write the option 1 inside double quotes
b: "A family tree ",                  ///// Write the option 2 inside double quotes
c: "A football team ", ///// Write the option 3 inside double quotes
d: "Water in water bottle", ///// Write the option 4 inside double quotes
},
correctAnswer: "d"                ///// Write the correct option inside double quotes
},
{
question: "5. On what principle objects are inserted and removed in stacks?",  ///// Write the question inside double quotes
answers: {
a: "LIFO",                  ///// Write the option 1 inside double quotes
b: "FIFO",                  ///// Write the option 2 inside double quotes
c: "Both a and b ", ///// Write the option 3 inside double quotes
d: "None of These ", ///// Write the option 4 inside double quotes
},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
