const Game = require("../../../1. Model/game")
const db = require("../../../DB/connect")

describe("Game", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getAll", () => {
        it("should return an array of games", async () => {
            const testGames = {
                
            }
        })
    })
})

// getAll
//"SELECT * FROM challenge;"
// "Unable to locate any games."
//return response.rows.map(game => new Game(game)

// getAllByChallengeId(challenge_id)
/* `SELECT q.questions_text, q.image_url, q.question_number, a.answers_id, a.answer_text, a.answer_option, s.score_value
            FROM questions AS q
            JOIN answers AS a 
            ON q.questions_id = a.question_id
            JOIN score AS s 
            ON a.score_id = s.score_id
            WHERE q.challenge_id = $1
            ORDER BY q.question_number, a.answer_option;`, [challenge_id] */
//"Unable to locate the game."
// return response.rows[0]