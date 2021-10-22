const name=document.getElementById('name')
const saveScoreBtn=document.getElementById('save-score-btn')
const finalScore=document.getElementById('final-score')
const mostRecentScore=localStorage.getItem('mostRecentScore')

const highScores=JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORE=0

finalScore.innerText=mostRecentScore

name.addEventListener('keyup',()=>{
    saveScoreBtn.disabled=!name.value
})

saveHighScore=e=>{
    e.preventDefault()
    const score={
        score: mostRecentScore,
        name: name.value
    }
    highScores.push(score)
    highScores.sort((a,b)=>{
        return b.score-a.score
    })

    highScores.splice(5)
    localStorage.setItem('highScores',JSON.stringify(highScores))
    window.location.assign('/')
}