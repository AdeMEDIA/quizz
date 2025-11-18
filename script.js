(function() {
    // --- 1. DEFINE YOUR QUESTIONS ---
    // An array of question objects.
    // You can easily add more questions here!
    const myQuestions = [
        {
            question: "1. Fungi are important producers",
            answers: {
                a: "True",
                b: "False",
                c: "None"
            },
            correctAnswer: "b"
        },
        {
            question: "2. Reproduction in both plants and animals is of two types namely _____ and  _____",
            answers: {
                a: "Asexual/sexual",
                b: "Sexual/binary fission",
                c: "Dad/Mum"
            },
            correctAnswer: "a"
        },
        {
            question: "3. _____ is the power house of the cell",
            answers: {
                a: "Cell membranee",
                b: "Medivine",
                c: "Mitochondria"
            },
            correctAnswer: "c"
        }
    ];

    // --- 2. GET HTML ELEMENTS ---
    // We need references to the HTML containers we created.
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // --- 3. FUNCTION TO BUILD THE QUIZ ---
    function buildQuiz() {
        // This will hold all our HTML output
        const output = [];

        // Loop through each question
        myQuestions.forEach((currentQuestion, questionNumber) => {
            
            // This will hold the list of answers for this question
            const answers = [];

            // Loop through each available answer for the current question
            for (let letter in currentQuestion.answers) {
                // Add an HTML radio button for each answer
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // Add this question and its answers to the main output
            output.push(
                `<div class="question-block">
                    <div class="question">${currentQuestion.question}</div>
                    <div class="answers">${answers.join('')}</div>
                </div>`
            );
        });

        // Finally, combine our output array into one string of HTML
        // and put it on the page inside the 'quiz' div.
        quizContainer.innerHTML = output.join('');
    }

    // --- 4. FUNCTION TO SHOW THE RESULTS ---
    function showResults() {
        // Get all the answer containers from the DOM
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // Keep track of the user's score
        let numCorrect = 0;

        // Loop through each question
        myQuestions.forEach((currentQuestion, questionNumber) => {
            
            // Find the selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Check if the answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // Add to the score
                numCorrect++;
                // (Optional: You could color the correct answers green here)
            } else {
                // (Optional: You could color the wrong answers red here)
            }
        });

        // Show the final score
        resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct!`;
    }

    // --- 5. INITIALIZE THE QUIZ ---
    // Build the quiz as soon as the page loads
    buildQuiz();

    // --- 6. ADD EVENT LISTENER ---
    // When the user clicks the submit button, run the showResults() function
    submitButton.addEventListener('click', showResults);

})();

