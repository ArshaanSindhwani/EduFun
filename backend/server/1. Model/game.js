const db = require("../DB/connect")

class Game {
    constructor({ id, challenge_name, subject_id }){
        this.id = id
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

    static async getAllFromChallengeId() {
        const response = await db.query("")
    }
    
    // Go over the Google Doc to check what needs to be a function

// questions_text, image_URL, answers_id, answers_text, score


    static async getOneById(id) {
        try {
        const response = await db.query("SELECT * FROM challenge WHERE id = $1;", [id])
        const game = new Game(response.rows[0])
        return game
        } catch (error) {
            throw new Error("Unable to locate the game.")
        }
    }

    static async getQuestionsByChallengeId(challengeId) {
        const response = await db.query(`
            SELECT q.questions_text
            FROM questions as q 
            JOIN challenge as c 
            ON q.challenge_id = c.id 
            WHERE c.id = $1`, [challengeId])
        if (response.rows.length === 0) {
            throw new Error("Unable to locate any questions for this game.")
        }
        return response.rows[0]
    }
}

module.exports = Game