const username = document.getElementById("username");
const saveScorebtn = document.getElementById('saveScorebtn');
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalscore.innerText = mostRecentScore;
 
const Max_highScores = 10;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
username.addEventListener("keyup" , function(){
    saveScorebtn.disabled = !username.value;
});

function saveHighScore(e){
    console.log(username.value);
    e.preventDefault();

    const score = {     
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a,b) => a.score - b.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('/');
};