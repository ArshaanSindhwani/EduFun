const db = require("../DB/connect")

class Game {
    constructor({ challenge_id, challenge_name, subject_id }){
        this.id = challenge_id
        this.challenge_name = challenge_name
        this.subject_id = subject_id
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM challenge;")
        if (response.rows.length === 0) {
            throw new Error("Unable to locate any games.")
        }
        return response.rows.map(game => new Game(game))
    }

    static async getAllByChallengeId(challenge_id) {
        const response = await db.query(
            `SELECT q.questions_text, q.image_url, q.question_number, a.answers_id, a.answer_text, a.answer_option, s.score_value
            FROM questions AS q
            JOIN answers AS a 
            ON q.questions_id = a.question_id
            JOIN score AS s 
            ON a.score_id = s.score_id
            WHERE q.challenge_id = $1
            ORDER BY q.question_number, a.answer_option;`, [challenge_id])
            if (response.rows.length === 0) {
                throw new Error("Unable to locate the game.")
            }
            return response.rows[0]
    }
}

module.exports = Game