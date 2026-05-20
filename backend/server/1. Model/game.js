const db = require("../DB/connect")

class Game {
    constructor({ id, challenge_name, subject_id}){
        this.id = id
        this.challenge_name = challenge_name
        this.subject_id = subject_id
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM challenge WHERE id = $1;", [id])
        if (response.rows.length === 0) {
            throw new Error("Unable to locate any games.")
        }
        return response.rows.map(game => new Game(game))
    }
}