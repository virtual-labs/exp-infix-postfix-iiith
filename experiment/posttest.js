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
            question: "1. Why is there a need to convert from infix to postfix and then evaluate, instead of directly evaluating infix? ", ///// Write the question inside double quotes
            answers: {
                a: " It is easier to read for humans ", ///// Write the option 1 inside double quotes
                b: " It is easier to [[https://en.wikipedia.org/wiki/Parsing][parse]](be read by computer).", ///// Write the option 2 inside double quotes
 		c: "Both a and b ", ///// Write the option 3 inside double quotes
                d: "None of these.", ///// Write the option 4 inside double quotes
            },
            correctAnswer: "b" ///// Write the correct option inside double quotes
        },

    {
      question: "2. Postfix evaluation of 1 2 + 3 9 - + 4 + is _______.",  ///// Write the question inside double quotes
      answers: {
        a: "3",                  ///// Write the option 1 inside double quotes
        b: "2",                  ///// Write the option 2 inside double quotes
	c: "1", ///// Write the option 3 inside double quotes
        d: "4", ///// Write the option 4 inside double quotes
              },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

{
      question: "3. Convert the expression from infix to postfix 1 + 1 - 3 * 4 / 2 + 3 - 8?",  ///// Write the question inside double quotes
      answers: {
        a: "1 1 + 3 - 4 * 2 / + 3 8 - ",                  ///// Write the option 1 inside double quotes
        b: "1 1 + 3 - 4 / 2 * 3 + 8 - ",                  ///// Write the option 2 inside double quotes
	c: "1 1 + 3 4 * 2 / - 3 + 8 - ", ///// Write the option 3 inside double quotes
        d: "1 1 * 3 + 4 - 2 + 3 / 8 - ", ///// Write the option 4 inside double quotes
              },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

{
      question: "4. Convert the expression from Infix to Postfix a + b * (c ^ d - e) ^ (f + g * h) - i?",  ///// Write the question inside double quotes
      answers: {
        a: "ab^cd-ef+d*h^*-i+",                  ///// Write the option 1 inside double quotes
        b: "ab^cd-ef+d*h*^-i+",                  ///// Write the option 2 inside double quotes
	c: "abcd^e-fgh*+^*+i- ", ///// Write the option 3 inside double quotes
        d: "abcd^e-fgh*+*^+i- ", ///// Write the option 4 inside double quotes
	 
              },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

{
      question: "5. Convert the expression from Infix to Postfix a + b * c - d ^ e ^ f?",  ///// Write the question inside double quotes
      answers: {
        a: "abc * + def ^^-",                  ///// Write the option 1 inside double quotes
        b: "abc * + de ^ f ^-\",                  ///// Write the option 2 inside double quotes
	c: "ab + c *d - e ^ f ^ ", ///// Write the option 3 inside double quotes
        d: "-+ a * bc ^^ def", ///// Write the option 4 inside double quotes
	 
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
