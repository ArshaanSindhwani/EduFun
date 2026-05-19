document.getElementById("user-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("classes-nav").addEventListener("click", () => {
    window.location.assign()
})

document.getElementById("scores-nav").addEventListener("click", () => {
    alert("Already here!")
})

const options = {
    method: "GET",
    headers: {
        Authorization: localStorage.getItem("token")
    }
}

const id = localStorage.getItem("id")

async function loadScores (id) {
    const response = await fetch(`http://localhost:3000/results/student/${id}`, options)

        if (response.status == 200) {
        const scores = await response.json();
    
        const container = document.getElementById("game-scores");

        scores.forEach(p => {
            const elem = createScoreElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

function createScoreElement (data) {
    const score = document.createElement("div");
    score.className ="card";

    const game = document.createElement("div");
    game.className ="card-header"
    game.textContent = data["gameName"];
    score.appendChild(game);

    const content = document.createElement("div");
    content.className ="card-body"
    score.appendChild(content);

    const contentGame = document.createElement("div")
    contentGame.className ="progress"
    contentGame.role="progressbar"
    score.appendChild(contentGame);

    const contentBar = document.createElement("div")
    contentBar.className="progress-bar"
    contentBar.style=`width:${data["score"]}%`
    score.appendChild(contentBar);

    return score;
}

loadScores(id)