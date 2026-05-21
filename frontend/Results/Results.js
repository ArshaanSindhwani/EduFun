document.getElementById("user-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("classes-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("scores-nav").addEventListener("click", () => {
    alert("Already here!")
})

document.getElementById("back-nav").addEventListener("click", () => {
    window.location.assign("../Home/Home.html")
})

// const options = {
//     method: "GET",
//     headers: {
//         Authorization: localStorage.getItem("token")
//     }
// }

const id = localStorage.getItem("id")
function showScore(challengeId, barId) {
    const score = localStorage.getItem(`challenge${challengeId}Score`);
    if (score !== null) {
        const bar = document.getElementById(barId);
        bar.style.width = `${score}%`;
        bar.textContent = `${score}%`;
        bar.setAttribute("aria-valuenow", score);
    }
}

showScore("1", "ww2-bar");
showScore("2", "romans-bar");
// const ww2Score = localStorage.getItem("ww2Score")
// if (ww2Score !== null) {
//     const bar = document.getElementById("ww2-bar");
//     bar.style.width = `${ww2Score}%`;
//     bar.textContent = `${ww2Score}%`;
//     bar.setAttribute("aria-valuenow", ww2Score); 
// }
// async function loadScores (id) {
//     const response = await fetch(`http://localhost:3000/results/student/${id}`, options)

//         if (response.status == 200) {
//         const scores = await response.json();
    
//         const container = document.getElementById("game-scores");

//         scores.forEach(p => {
//             const elem = createScoreElement(p);
//             container.appendChild(elem);
//         })
//     } else {
//         window.location.assign("../Home/Home.html");
//     }

// }

// function createScoreElement (data) {
//     const score = document.createElement("div");
//     score.className ="card";

//     const game = document.createElement("div");
//     game.className ="card-header"
//     // game.textContent = "data["gameName"]";
//     game.textContent = "WW2";
//     score.appendChild(game);

//     const content = document.createElement("div");
//     content.className ="card-body"
//     score.appendChild(content);

//     const contentGame = document.createElement("div")
//     contentGame.className ="progress"
//     contentGame.role="progressbar"
//     score.appendChild(contentGame);

//     const contentBar = document.createElement("div")
//     contentBar.className="progress-bar"
//     contentBar.style=`width:${score}%`
//     score.appendChild(contentBar);

//     return score;
// }

// loadScores(id)