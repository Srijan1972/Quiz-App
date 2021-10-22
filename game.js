const question=document.getElementById('question')
const choices=Array.from(document.querySelectorAll('.choice-text'))
const progressText=document.getElementById('progress-text')
const scoreText=document.getElementById('score')
const progressBarFull=document.getElementById('progress-bar-full')

let currentQuestions={}
let acceptingAnswers=true
let score=0
let qcount=0
let availablequestions=[]

let questions=[
    {
        question: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "27",
        answer: 2
    },
    {
        question: "Where is it winter in July",
        choice1: "Australia",
        choice2: "Canada",
        choice3: "India",
        choice4: "Germany",
        answer: 1
    },
    {
        question: "Who is the Senate?",
        choice1: "Sam",
        choice2: "Yoda",
        choice3: "Palpatine",
        choice4: "Me",
        answer: 3
    },
    {
        question: "Who is inevitable?",
        choice1: "Thor",
        choice2: "Iron Man",
        choice3: "Your Mom",
        choice4: "Thanos",
        answer: 4
    }
]

const SCORE_POINTS=25;
const MAX_QUESTIONS=4;

startGame=()=>{
    qcount=0
    score=0
    availablequestions=[...questions]
    getNewQuestion()
}

getNewQuestion=()=>{
    if(availablequestions.length==0 || qcount>MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('./end.html')
    }
    qcount++
    progressText.innerText=`Question ${qcount} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${100*qcount/MAX_QUESTIONS}%`
    const qidx=Math.floor(Math.random()*availablequestions.length)
    currq=availablequestions[qidx]
    question.innerText=currq.question
    choices.forEach(choice=>{
        const number=choice.dataset['number']
        choice.innerText=currq['choice'+number]
    })
    availablequestions.splice(qidx,1)
    acceptingAnswers=true
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return
        acceptingAnswers=false
        const selectedChoice=e.target
        const selectedAnswer=selectedChoice.dataset['number']
        let classToApply=currq.answer==selectedAnswer ? 'correct':'incorrect'
        if(classToApply==='correct'){
            incre(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion(0)
        },1000)
    })
})

incre=num=>{
    score+=num
    scoreText.innerText=score
}

startGame()