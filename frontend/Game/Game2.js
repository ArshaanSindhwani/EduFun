const id = localStorage.getItem("id");
const challengeId = localStorage.getItem("challengeId");
 
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
}
 
function populateChallenges(rows) {
    rows.forEach(row => {
        const qNum = row.question_number;
        const aNum = row.answer_option;
 
        // Set question text and image
        document.getElementById(`q-${qNum}`).textContent = row.questions_text;
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