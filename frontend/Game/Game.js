const id = localStorage.getItem("id")
const challengeId = localStorage.getItem("challengeId")

// Call each ID within the html
const image1 = document.getElementById("image-1")
const image2 = document.getElementById("image-2")
const image3 = document.getElementById("image-3")
const image4 = document.getElementById("image-4")
const image5 = document.getElementById("image-5")
const q1 = document.getElementById("q-1")
const q2 = document.getElementById("q-2")
const q3 = document.getElementById("q-3")
const q4 = document.getElementById("q-4")
const q5 = document.getElementById("q-5")
const a11 = document.getElementById("a-1-1")
const a12 = document.getElementById("a-1-2")
const a13 = document.getElementById("a-1-3")
const a14 = document.getElementById("a-1-4")
const a21 = document.getElementById("a-2-1")
const a22 = document.getElementById("a-2-2")
const a23 = document.getElementById("a-2-3")
const a24 = document.getElementById("a-2-4")
const a31 = document.getElementById("a-3-1")
const a32 = document.getElementById("a-3-2")
const a33 = document.getElementById("a-3-3")
const a34 = document.getElementById("a-3-4")
const a41 = document.getElementById("a-4-1")
const a42 = document.getElementById("a-4-2")
const a43 = document.getElementById("a-4-3")
const a44 = document.getElementById("a-4-4")
const a51 = document.getElementById("a-5-1")
const a52 = document.getElementById("a-5-2")
const a53 = document.getElementById("a-5-3")
const a54 = document.getElementById("a-5-4")

loadChallenge(challengeId)

async function loadChallenge(challengeId) {
    const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
            id: id,
            challengeId: challengeId
        })
      };
      
    const response = await fetch(`http://localhost:3000/game/${challengeId}`, options);

    if (response.status == 200) {
        const game = await response.json();
    
        game.forEach(p => {
            // once here
            if (p["answer_option"] === "A") {
                let num = p["question_number"]
                let num2 = p["answer_option"]
                (q+num).textContent=`${p["questions_text"]}`
                (image+num).textContent=`${p["Image_url"]}`
                (a+num+num2).textContent=`${p["answer_text"]}`
            } else 
                // three times here 
                {
                let num = p["question_number"]
                let num2 = p["answer_option"]
                (a+num+num2).textContent=`${p["answer_text"]}`
            }
        })
    } else {
        alert("Game not Loading")
        window.location.assign("../Home/Home.html");
    }

}

const runningTotal

document.getElementsByClassName("btn btn-primary").addEventListener("submit", saveAnswer())

function saveAnswer()  {}

document.getElementById("complete").addEventListener("click", async (e)=> {
    e.preventDefault()

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId : id,
            challengeId : challengeId,
            score: runningTotal
        })
    }

    await fetch(`"http://localhost:3000/game/${id}`, options)
    const data = await response.json();

    if (response.status == 200) {
        alert("Score Received!")
        window.location.assign("../Home/Home.html");
      } else {
        alert(data.error);
      }
})