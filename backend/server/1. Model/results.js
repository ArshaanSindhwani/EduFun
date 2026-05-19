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
        if (response.rows.length === 0) {
            throw new Error("Unable to locate results for this student.")
        }
        return response.rows.map(result => new Outcome(result))
    }

    static async getAverageScoreByStudentId(studentId) {
        const response = await db.query("SELECT AVG(o.score) as average_score FROM outcome as o JOIN student as s ON o.student_id = s.id WHERE s.id = $1;", [studentId])
        if (response.rows.length === 0) {
            throw new Error("Unable to locate results for this student.")
        }
        return response.rows[0]
    }
    
    static async getAverageScoreBySubjectIdByStudentId(studentId, subjectId) {
        const response = await db.query(
            `SELECT sub.subject_name, AVG(o.score) AS average_score 
            FROM outcome AS o 
            JOIN student AS s 
            ON o.student_id = s.id 
            JOIN challenge AS c 
            ON o.challenge_id = c.id 
            JOIN subject AS sub 
            ON c.subject_id = sub.id 
            WHERE s.id = $1 AND sub.id = $2 
            GROUP BY s.name, sub.subject_name;`,
            [studentId, subjectId]
        )
        if (response.rows.length === 0) {
            throw new Error("Unable to locate results for this student and subject.")
        }
        return response.rows[0]
    }
}

module.exports = Outcome