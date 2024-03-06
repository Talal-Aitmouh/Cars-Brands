const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "What's this brand?",
        choices: ["BMW", "PORSCHE", "DACIA", "FERRARI"],
        answer: "PORSCHE",
        image: "img/porsche.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["MERCEDES", "AUDI", "CHERRY", "OPEL"],
        answer: "AUDI",
        image: "img/audi.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["RAM", "TESLA", "DACIA", "VOLKSWAGEN"],
        answer: "RAM",
        image: "img/ram.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["FIAT", "SEAT", "BUGATTI", "LAMBO"],
        answer: "SEAT",
        image: "img/seat.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["PEGANI", "LOTUS", "DS", "CITROEN"],
        answer: "DS",
        image: "img/ds.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["CHERRY", "HAMMER", "JEEP", "TOYOTA"],
        answer: "CHERRY",
        image: "img/cherry.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["PEUGEOT", "OPEL", "REUNAUT", "LOGAN"],
        answer: "OPEL",
        image: "img/opel.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["JAGUAR", "GOODGE", "DS", "BMW"],
        answer: "BMW",
        image: "img/bmw.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["PEGANI", "MAZDA", "MASERATI ", "MINI COUPER"],
        answer: "MAZDA",
        image: "img/mazda.png" // Make sure the path is correctly pointing to your image file.
    },
    {
        question: "What's this brand?",
        choices: ["VOLKSWAGEN", "RAM", "TOYOTA", "HYUNDAI"],
        answer: "VOLKSWAGEN",
        image: "img/volk.png" // Make sure the path is correctly pointing to your image file.
    },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    // Clear previous image and add new one
    const imgElement = document.createElement('img');
    imgElement.src = questionDetails.image; // Ensure the path is correct
    imgElement.alt = "question image";
    imgElement.classList.add('question-image');
    if (container.querySelector('img')) { // Check if there's already an image and replace it
        container.replaceChild(imgElement, container.querySelector('img'));
    } else {
        container.insertBefore(imgElement, choicesBox); // Insert before choices if not replacing
    }

    choicesBox.textContent = "";
    // Ensure only one choice is selectable at a time
    const previousSelected = choicesBox.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }

    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            const currentlySelected = choicesBox.querySelector('.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }
            choiceDiv.classList.add('selected');
        });
    });

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
};

// Function to check answers
// Function to check answers
// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    const correctAnswer = quiz[currentQuestionIndex].answer;
    
    if (selectedChoice) {
        if (selectedChoice.textContent === correctAnswer) {
            displayAlert("Correct Answer!");
            selectedChoice.classList.add('correct-choice');
            score++;

            // Play correct answer sound
            const correctSound = document.getElementById('correctSound');
            correctSound.play();
        } else {
            displayAlert(`Wrong Answer! Try again later.`);
            selectedChoice.classList.add('wrong-choice');

            // Play incorrect answer sound
            const incorrectSound = document.getElementById('incorrectSound');
            incorrectSound.play();
        }
    } else {
        displayAlert("Time's up! Moving to the next question.");
    }

    // Remove the selected class from all choices
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.classList.remove('selected');
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
    timeLeft = 15;
}





// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";

    // Hide the image
    const imgElement = container.querySelector('.question-image');
    if (imgElement) {
        imgElement.style.display = 'none';
    }
};

// Function to Show Alert
// Function to Show Alert
const displayAlert = (msg, isWrong) => {
    alert.style.display = "block";
    alert.textContent = msg;
    if (isWrong) {
        alert.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // Red background for wrong answer
    } else {
        alert.style.backgroundColor = "#557c93"; // Default background color for other alerts
    }
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}


// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any existing timers
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
    
        if (timeLeft === 0 && !quizOver) {
            const selectedChoice = document.querySelector('.choice.selected');
            if (!selectedChoice) {
                checkAnswer(); // Skip to the next question
            }
        }
        if (timeLeft < 0) {
            timeLeft = 0; // Set timeLeft to 0 if it becomes negative
        }
    }
    

    timerID = setInterval(countDown, 1000);
}



// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});