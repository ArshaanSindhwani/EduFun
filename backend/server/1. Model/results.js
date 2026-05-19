const db = require("../DB/connect")

class Outcome {
    constructor({ id, student_id, score, challenge_id }) {
        this.id = id
        this.student_id = student_id
        this.score = score
        this.challenge_id = challenge_id
    }

    static async getAllByStudentId(studentId) {
        const response = await db.query("SELECT o.score, c.challenge_name, s.name FROM outcome as o JOIN student as s ON o.student_id = s.id JOIN challenge as c ON o.challenge_id = c.id WHERE s.id = $1;", [studentId])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate results for this student.")
        }
        return new Outcome(response.rows[0])
    }

    static async getAverageScoreByStudentId() {}

    static async getAverageScoreBySubjectIdByStudentId() {}
}

