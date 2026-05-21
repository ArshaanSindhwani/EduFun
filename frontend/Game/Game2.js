const id = localStorage.getItem("id");
const challengeId = localStorage.getItem("challengeId");

const userChoices = {};

// ---- Sidebar navigation ----
document.getElementById("user-nav").addEventListener("click", () => {
    window.location.assign("#"); // placeholder
});
document.getElementById("classes-nav").addEventListener("click", () => {
    window.location.assign("#"); // placeholder
});
document.getElementById("scores-nav").addEventListener("click", () => {
    window.location.assign("../Results/Results.html");
});
document.getElementById("back-nav").addEventListener("click", () => {
    window.location.assign("../Home/Home.html");
});

loadChallenge(challengeId);
 
async function loadChallenge(challengeId) {
    const options = {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    };
 
    const response = await fetch(`http://localhost:3000/game/${challengeId}`, options);
 
    if (response.status !== 200) {
        alert("Game is not loading");
    }
 
    const json = await response.json();
    const rows = json.data;
 
    populateChallenges(rows);
    attachAnswerListeners();
    attachFinishListener();
}
 
function populateChallenges(rows) {
    rows.forEach(row => {
        const qNum = row.question_number;
        const aNum = row.answer_option;
 
        // Set question text and image
        document.getElementById(`q-${qNum}`).textContent = row.questions_text+"?";
        document.getElementById(`image-${qNum}`).src = row.image_url;
        document.getElementById(`a-${qNum}-${aNum}`).textContent = row.answer_text;
 
        // Tag the matching radio with its score value
        const radios = document.querySelectorAll(`input[name="q-${qNum}"]`);
        const radio = radios[aNum - 1];
        if (radio) {
            radio.dataset.score = row.score_value;
        }
    });
}

// Listen for radio changes in all 5 scenarios and update the progress bar
function attachAnswerListeners() {
    for (let qNum = 1; qNum <= 5; qNum++) {
        const radios = document.querySelectorAll(`input[name="q-${qNum}"]`);
        radios.forEach(radio => {
            radio.addEventListener("change", () => {
                userChoices[qNum] = parseInt(radio.dataset.score);
                updateProgressBar();
            });
        });
    }
}
 
// Sum all current choices and update the side progress bar
function updateProgressBar() {
    const total = Object.values(userChoices).reduce((sum, val) => sum + val, 0);
    const bar = document.querySelector("#challenge .progress-bar");
    bar.style.width = `${total}%`;
    bar.textContent = `${total}%`;
    bar.setAttribute("aria-valuenow", total);
}

// Save the final score to localStorage and go to Results
function attachFinishListener() {
    document.getElementById("complete").addEventListener("click", (e) => {
        e.preventDefault();
 
        if (Object.keys(userChoices).length < 5) {
            alert("Please answer all 5 questions before finishing.");
            return;
        }
 
        const finalScore = Object.values(userChoices).reduce((sum, val) => sum + val, 0);
 
        // Save the score so the Results page can read it
        localStorage.setItem("ww2Score", finalScore);
 
        window.location.assign("../Results/Results.html");
    });
}