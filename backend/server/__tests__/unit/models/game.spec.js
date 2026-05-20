const Game = require("../../../1. Model/game")
const db = require("../../../DB/connect")

describe("Game", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getAll", () => {
        it("should return an array of games", async () => {
            const testGames = [
                { challenge_id: 1, challenge_name: "History Challenge", subject_id: 1 },
                { challenge_id: 2, challenge_name: "Geography Challenge", subject_id: 2 }
            ]
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: testGames })

            const result = await Game.getAll()

            expect(result).toBeInstanceOf(Array)
            expect(result[0]).toBeInstanceOf(Game)
            expect(result[0].id).toBe(testGames[0].challenge_id)
            expect(result[0].challenge_name).toBe(testGames[0].challenge_name)
            expect(result[0].subject_id).toBe(testGames[0].subject_id)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM challenge;")  
        })

        it("should throw an error when no games are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Game.getAll()).rejects.toThrow("Unable to locate any games.")
        })
    })

    describe("getAllByChallengeId", () => {
        it("should return a game when given a valid challenge id", async () => {
        const testGame = {
            questions_text: "What is the capital of France?",
            image_url: null,
            question_number: 1,
            answers_id: 1,
            answer_text: "Paris",
            answer_option: "A",
            score_value: 10
        }
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testGame] })

        const result = await Game.getAllByChallengeId(1)

        expect(result).toEqual(testGame)
        expect(db.query).toHaveBeenCalledWith(
            `SELECT q.questions_text, q.image_url, q.question_number, a.answers_id, a.answer_text, a.answer_option, s.score_value
            FROM questions AS q
            JOIN answers AS a 
            ON q.questions_id = a.question_id
            JOIN score AS s 
            ON a.score_id = s.score_id
            WHERE q.challenge_id = $1
            ORDER BY q.question_number, a.answer_option;`, [1]
        )
        })

        it("should throw an error when given an invalid challenge id", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Game.getAllByChallengeId(999)).rejects.toThrow("Unable to locate the game.")
        })
    })
})