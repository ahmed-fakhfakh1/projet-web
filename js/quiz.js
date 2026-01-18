const correctAnswers = [0, 1, 2, 2, 1, 1, 0, 2, 2, 2, 1, 0];

const totalQuestions = 12;

let userAnswers = new Array(totalQuestions).fill(null);

function submitQuiz() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            userAnswers[index] = parseInt(selectedOption.value);
        }
    });
    
    const unanswered = userAnswers.findIndex(answer => answer === null);
    
    if (unanswered !== -1) {
        alert(`Veuillez répondre à toutes les questions. Question ${unanswered + 1} non répondue.`);
        return;
    }

    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
    });

    const percentage = ((score / totalQuestions) * 100).toFixed(1);

    displayResults(score, percentage, questions);

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submit-quiz').style.display = 'none';
    document.getElementById('reset-quiz').style.display = 'inline-block';
    document.getElementById('quiz-results').style.display = 'block';

    document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });
}

function displayResults(score, percentage, questions) {
    const scoreDisplay = document.getElementById('score-display');
    const answersReview = document.getElementById('answers-review');

    let message = '';
    if (percentage >= 80) {
        message = 'Excellent ! 🎉';
    } else if (percentage >= 60) {
        message = 'Bien joué ! 👍';
    } else if (percentage >= 40) {
        message = 'Pas mal, mais vous pouvez mieux faire ! 💪';
    } else {
        message = 'Il faut réviser un peu plus ! 📚';
    }

    scoreDisplay.innerHTML = `
        <p>${message}</p>
        <p>Votre score : ${score} / ${totalQuestions} (${percentage}%)</p>
    `;

    let reviewHTML = '<h3>Révision des réponses</h3>';
    
    questions.forEach((question, index) => {
        const questionText = question.querySelector('h3').textContent;
        const options = question.querySelectorAll('.answer label span');
        const userAnswer = userAnswers[index];
        const correctAnswer = correctAnswers[index];
        const isCorrect = userAnswer === correctAnswer;
        const resultClass = isCorrect ? 'correct' : 'incorrect';

        reviewHTML += `
            <div class="answer-result ${resultClass}">
                <p><strong>${questionText}</strong></p>
                <p>Votre réponse : ${options[userAnswer].textContent} ${isCorrect ? '✓' : '✗'}</p>
                ${!isCorrect ? `<p>Bonne réponse : ${options[correctAnswer].textContent}</p>` : ''}
            </div>
        `;
    });

    answersReview.innerHTML = reviewHTML;
}

function resetQuiz() {
    userAnswers = new Array(totalQuestions).fill(null);

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    document.getElementById('quiz').style.display = 'block';
    document.getElementById('submit-quiz').style.display = 'inline-block';
    document.getElementById('reset-quiz').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}