const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const classifica = document.querySelector('#classifica')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScore')) || []

const MAX_HIGH_SCORES = 5

classifica.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(MAX_HIGH_SCORES)

    localStorage.setItem('highScore', JSON.stringify(highScores))
    window.location.assign('index.html')
}