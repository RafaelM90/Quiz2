const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// let perguntaAtual = {}
// let acceptingAnswers = true
// let score = 0
// let contadorPerguntas = 0
// let availableQuestions = []

let perguntas = [
    {   
        // Questões de múltipla escolha sobre sequência aritimética (4) 

        pergunta: 'Qual é o próximo número na sequência aritmética: 5, 10, 15, 20, ...?',
        choice1: '25',
        choice2: '30',
        choice3: '35',
        answer: 1,
    },
    {
        pergunta: 'Qual é o próximo número na sequência aritmética: 12, 17, 22, 27, ...?',
        choice1: '32',
        choice2: '37',
        choice3: '42',
        answer: 1,
    },
    {
        pergunta: 'Qual é o próximo número na sequência aritmética: 7, 14, 21, 28, ...?',
        choice1: '39',
        choice2: '37',
        choice3: '35',
        answer: 3,
    },
    {
        pergunta: 'Qual é o próximo número na sequência aritmética: 3, 6, 9, 12, ...?',
        choice1: '18',
        choice2: '15',
        choice3: '21',
        answer: 2,
    },

    // Questões de múltipla escolha sobre sequência geométrica (4)

    {
        pergunta: 'Qual é o próximo número na sequência geométrica: 2, 6, 18, 54, ...?',
        choice1: '108',
        choice2: '162',
        choice3: '324',
        answer: 2,
    },
    {
        pergunta: 'Qual é o próximo número na sequência geométrica: 5, 15, 45, 135, ...?',
        choice1: '270',
        choice2: '540',
        choice3: '405',
        answer: 3,
    },
    {
        pergunta: 'Qual é o próximo número na sequência geométrica: 4, 12, 36, 108, ...?',
        choice1: '324',
        choice2: '342',
        choice3: '234',
        answer: 1,
    },
   
    // Questões de múltipla escolha sobre sequência (4)

    {
        pergunta: 'Qual é o próximo número na sequência: 20, 15, 25, 20, 30, ...?',
        choice1: '25',
        choice2: '35',
        choice3: '40',
        answer: 2,
    },
    {
        pergunta: 'Qual é o próximo número na sequência: 12, 10, 14, 12, ...?',
        choice1: '10',
        choice2: '16',
        choice3: '14',
        answer: 1,
    },
    {
        pergunta: 'Qual é o próximo número na sequência: 50, 45, 55, 50, 60, ...?',
        choice1: '55',
        choice2: '65',
        choice3: '70',
        answer: 2,
    },
    {
        pergunta: 'Qual é o próximo número na sequência: 30, 40, 35, 45, 40, ...?',
        choice1: '45',
        choice2: '55',
        choice3: '50',
        answer: 3,
    },
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...perguntas]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Perguntas ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.pergunta

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]     
    });

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'certo' : 'errado'
        
        if(classToApply === 'certo') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

startGame()